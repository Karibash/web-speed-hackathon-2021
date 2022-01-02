import createRouter from 'find-my-way';

import { Comment, Post, User } from './models';

const fallbackRouter = createRouter({ defaultRoute: () => {} });

fallbackRouter.get('/', async () => {
  const fallback = {};
  fallback['/api/v1/posts'] = await Post.findAll( { limit : 5, offset: 0 } );
  return fallback;
});

fallbackRouter.get('/posts/:postId', async (_request, _reply, params) => {
  const fallback = {};
  fallback[`/api/v1/posts/${params.postId}`] = await Post.findByPk(params.postId);
  fallback[`/api/v1/posts/${params.postId}/comments`] = await Comment.findAll({
    limit : 5,
    offset: 0,
    where : { postId: params.postId },
  });
  return fallback;
});

fallbackRouter.get('/users/:username', async (_request, _reply, params) => {
  const fallback = {};
  const user = await User.findOne({ where: { username: params.username } });
  fallback[`/api/v1/users/${params.username}`] = user;
  fallback[`/api/v1/users/${params.username}/posts`] = await Post.findAll({
    limit : 5,
    offset: 0,
    where : { userId: user.id },
  });
  return fallback;
});

export { fallbackRouter };
