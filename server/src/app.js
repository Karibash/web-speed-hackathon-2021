import fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import fastifySession from '@fastify/session';

import { apiRouter } from './routes/api';
import { ssrRouter } from './routes/ssr';
import { staticRouter } from './routes/static';

const app = fastify({
  trustProxy: true,
  bodyLimit: 1024 * 1024 * 10,
});

app.register(fastifyCookie);
app.register(fastifySession, {
  secret: 'a secret with minimum length of 32 characters',
  saveUninitialized: false,
  cookie: {
    secure: 'auto',
  },
});

app.addContentTypeParser('*', (request, payload, next) => {
  const chunks = [];
  payload.on('data', chunk => { chunks.push(chunk) })
  payload.on('end', () => {
    next(null, Buffer.concat(chunks));
  });
});

app.register(apiRouter, { prefix: '/api/v1' });
app.register(ssrRouter);
app.register(staticRouter);

export { app };
