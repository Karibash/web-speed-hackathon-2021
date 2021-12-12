import httpErrors from 'http-errors';

import { Comment, Post } from '../../models';

/**
 * @param {import('fastify').FastifyInstance} instance
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {(err?: Error) => void} next
 * @returns {() => void}
 */
const router = (instance, options, next) => {
  instance.get('/posts', async (request, reply) => {
    const posts = await Post.findAll({
      limit: request.query.limit,
      offset: request.query.offset,
    });

    reply.status(200).type('application/json').send(posts);
  });

  instance.get('/posts/:postId', async (request, reply) => {
    const post = await Post.findByPk(request.params.postId);

    if (post === null) {
      throw new httpErrors.NotFound();
    }

    reply.status(200).type('application/json').send(post);
  });

  instance.get('/posts/:postId/comments', async (request, reply) => {
    const posts = await Comment.findAll({
      limit: request.query.limit,
      offset: request.query.offset,
      where: {
        postId: request.params.postId,
      },
    });

    reply.status(200).type('application/json').send(posts);
  });

  instance.post('/posts', async (request, reply) => {
    if (request.session.userId === undefined) {
      throw new httpErrors.Unauthorized();
    }

    const post = await Post.create(
      {
        ...request.body,
        userId: request.session.userId,
      },
      {
        include: [
          {
            association: 'images',
            through: { attributes: [] },
          },
          { association: 'movie' },
          { association: 'sound' },
        ],
      },
    );

    reply.status(200).type('application/json').send(post);
  });

  next();
};

export { router as postRouter };
