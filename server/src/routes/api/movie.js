import { promises as fs } from 'fs';
import path from 'path';

import httpErrors from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

import { convertMovie } from '../../converters/convert_movie';
import { UPLOAD_PATH } from '../../paths';

// 変換した動画の拡張子
const EXTENSION = 'webm';
// 変換した動画のサイズ
const SIZE = 600;

/**
 * @param {import('fastify').FastifyInstance} instance
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {(err?: Error) => void} next
 * @returns {() => void}
 */
const router = (instance, options, next) => {
  instance.post('/movies', async (request, reply) => {
    if (request.session.userId === undefined) {
      throw new httpErrors.Unauthorized();
    }
    if (Buffer.isBuffer(request.body) === false) {
      throw new httpErrors.BadRequest();
    }

    const movieId = uuidv4();

    const converted = await convertMovie(request.body, {
      // 動画の拡張子を指定する
      extension: EXTENSION,
      // 動画の縦横サイズを指定する (undefined は元動画に合わせる)
      size: SIZE,
    });

    const filePath = path.resolve(UPLOAD_PATH, `./movies/${movieId}.${EXTENSION}`);
    await fs.writeFile(filePath, converted);

    reply.status(200).type('application/json').send({ id: movieId });
  });

  next();
};

export { router as movieRouter };
