import httpErrors from 'http-errors';

import { User } from '../../models';

/**
 * @param {import('fastify').FastifyInstance} instance
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {(err?: Error) => void} next
 * @returns {() => void}
 */
const router = (instance, options, next) => {
  instance.post('/signup', async (request, reply) => {
    const { id: userId } = await User.create(request.body);

    const user = await User.findByPk(userId);

    request.session.userId = user.id;

    reply.status(200).type('application/json').send(user);
  });

  instance.post('/signin', async (request, reply) => {
    const user = await User.findOne({
      where: {
        username: request.body.username,
      },
    });

    if (user === null) {
      throw new httpErrors.BadRequest();
    }
    if (user.validPassword(request.body.password) === false) {
      throw new httpErrors.BadRequest();
    }

    request.session.userId = user.id;

    reply.status(200).type('application/json').send(user);
  });

  instance.post('/signout', async (request, reply) => {
    request.session.userId = undefined;
    reply.status(200).type('application/json').send({});
  });

  next();
};

export { router as authRouter };
