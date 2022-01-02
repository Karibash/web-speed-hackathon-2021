import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ChunkExtractor } from '@loadable/server';
import { SWRConfig } from 'swr';
import path from 'path';
import fs from 'fs';

import { cache } from '../cache';
import { fallbackRouter } from '../fallback';
import { CLIENT_DIST_PATH } from '../paths';
import { AppContainer } from '../../../dist/client/ssr';

const indexHtml = fs.readFileSync(path.resolve(CLIENT_DIST_PATH, './index.html'), 'utf8');

/**
 * @param {import('fastify').FastifyInstance} instance
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {(err?: Error) => void} next
 * @returns {() => void}
 */
const router = (instance, options, next) => {
  instance.setNotFoundHandler(async (request, reply) => {
    const cachedHtml = cache.get(request.url);

    if (cachedHtml) {
      reply
        .type('text/html')
        .header('Cache-Control', 'public, s-maxage=1, stale-while-revalidate=31536000')
        .send(cachedHtml);
    }

    const fallback = await fallbackRouter.lookup(request, reply);
    const extractor = new ChunkExtractor({ statsFile: path.resolve(CLIENT_DIST_PATH, './loadable-stats.json') });
    const chunks = extractor.collectChunks((
      <StaticRouter location={request.url}>
        <SWRConfig value={{ fallback: fallback ?? {} }}>
          <AppContainer />
        </SWRConfig>
      </StaticRouter>
    ));

    const html = indexHtml
      .replace(/(<div id="app">)/, `$1${renderToString(chunks)}`)
      .replace(/(<script id="fallback" type="application\/json">)/, `$1${JSON.stringify(fallback)}`);
    if (!cachedHtml) {
      reply
        .type('text/html')
        .header('Cache-Control', 'public, s-maxage=1, stale-while-revalidate=31536000')
        .send(html);
    }

    cache.set(request.url, html);
  });

  next();
};

export { router as ssrRouter };
