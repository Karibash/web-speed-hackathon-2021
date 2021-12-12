import httpErrors from 'http-errors';

import { Post, User } from '../../models';

/**
 * @param {import('fastify').FastifyInstance} instance
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {(err?: Error) => void} next
 * @returns {() => void}
 */
const router = (instance, options, next) => {
  instance.get('/me', async (request, reply) => {
    if (request.session.userId === undefined) {
      throw new httpErrors.Unauthorized();
    }
    const user = await User.findByPk(request.session.userId);

    if (user === null) {
      throw new httpErrors.NotFound();
    }

    reply.status(200).type('application/json').send(user);
  });

  instance.put('/me', async (request, reply) => {
    if (request.session.userId === undefined) {
      throw new httpErrors.Unauthorized();
    }
    const user = await User.findByPk(request.session.userId);

    if (user === null) {
      throw new httpErrors.NotFound();
    }

    Object.assign(user, request.body);
    await user.save();

    reply.status(200).type('application/json').send(user);
  });

  instance.get('/users/:username', async (request, reply) => {
    const user = await User.findOne({
      where: {
        username: request.params.username,
      },
    });

    if (user === null) {
      throw new httpErrors.NotFound();
    }

    reply.status(200).type('application/json').send(user);
  });

  instance.get('/users/:username/posts', async (request, reply) => {
    const user = await User.findOne({
      where: {
        username: request.params.username,
      },
    });

    if (user === null) {
      throw new httpErrors.NotFound();
    }

    const posts = await Post.findAll({
      limit: request.query.limit,
      offset: request.query.offset,
      where: {
        userId: user.id,
      },
    });

    reply.status(200).type('application/json').send(posts);
  });

  next();
};

export { router as userRouter };
