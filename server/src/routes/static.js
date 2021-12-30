import fastifyStatic from 'fastify-static';

import { CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH } from '../paths';

/**
 * @param {import('fastify').FastifyInstance} instance
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {(err?: Error) => void} next
 * @returns {() => void}
 */
const router = (instance, options, next) => {
  instance.register(fastifyStatic, {
    root: [
      UPLOAD_PATH,
      PUBLIC_PATH,
      CLIENT_DIST_PATH,
    ],
    index: false,
    prefix: '/',
    etag: true,
    maxAge: '100y',
    immutable: true,
    lastModified: true,
  });

  next();
};

export { router as staticRouter };
