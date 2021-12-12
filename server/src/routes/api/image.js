import { promises as fs } from 'fs';
import path from 'path';

import httpErrors from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

import { convertImage } from '../../converters/convert_image';
import { UPLOAD_PATH } from '../../paths';

// 変換した画像の拡張子
const EXTENSION = 'avif';
// 変換した画像の横サイズ
const WIDTH = 600;

/**
 * @param {import('fastify').FastifyInstance} instance
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {(err?: Error) => void} next
 * @returns {() => void}
 */
const router = (instance, options, next) => {
  instance.post('/images', async (request, reply) => {
    if (request.session.userId === undefined) {
      throw new httpErrors.Unauthorized();
    }
    if (Buffer.isBuffer(request.body) === false) {
      throw new httpErrors.BadRequest();
    }

    const imageId = uuidv4();

    const converted = await convertImage(request.body, {
      // 画像の拡張子を指定する
      extension: EXTENSION,
      // 画像の縦サイズを指定する (undefined は元画像に合わせる)
      height: undefined,
      // 画像の横サイズを指定する (undefined は元画像に合わせる)
      width: WIDTH,
    });

    const filePath = path.resolve(UPLOAD_PATH, `./images/${imageId}.${EXTENSION}`);
    await fs.writeFile(filePath, converted);

    reply.status(200).type('application/json').send({ id: imageId });
  });

  next();
};

export { router as imageRouter };
