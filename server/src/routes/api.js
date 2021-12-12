import httpErrors from 'http-errors';
import { ValidationError } from 'sequelize';

import { authRouter } from './api/auth';
import { imageRouter } from './api/image';
import { initializeRouter } from './api/initialize';
import { movieRouter } from './api/movie';
import { postRouter } from './api/post';
import { soundRouter } from './api/sound';
import { userRouter } from './api/user';

/**
 * @param {import('fastify').FastifyInstance} instance
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {(err?: Error) => void} next
 * @returns {() => void}
 */
const router = (instance, options, next) => {
  instance.addHook('preHandler', (_request, reply, next) => {
    reply.header('Cache-Control', 'max-age=0');
    next();
  });

  instance.register(initializeRouter);
  instance.register(userRouter);
  instance.register(postRouter);
  instance.register(movieRouter);
  instance.register(imageRouter);
  instance.register(soundRouter);
  instance.register(authRouter);

  instance.addHook('onError', (_request, _reply, error, _next) => {
    if (error instanceof ValidationError) {
      throw new httpErrors.BadRequest();
    }
    throw error;
  });

  instance.setErrorHandler((error, request, reply) => {
    const sendError = error instanceof ValidationError ? new httpErrors.BadRequest() : error;

    if (!('status' in sendError) || sendError.status === 500) {
      console.error(sendError);
    }

    reply
      .status(sendError.status || 500)
      .type('application/json')
      .send({
        message: sendError.message,
      });
  });

  next();
};

export { router as apiRouter };
