import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';
import fs from 'fs';

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
  instance.setNotFoundHandler((request, reply) => {
    const extractor = new ChunkExtractor({ statsFile: path.resolve(CLIENT_DIST_PATH, './loadable-stats.json') });
    const chunks = extractor.collectChunks((
      <StaticRouter location={request.url}>
        <AppContainer />
      </StaticRouter>
    ));

    reply
      .type('text/html')
      .header('Cache-Control', 'public, s-maxage=1, stale-while-revalidate=31536000')
      .send(indexHtml.replace(/(<div id="app">)/, `$1${renderToString(chunks)}`));
  });

  next();
};

export { router as ssrRouter };
