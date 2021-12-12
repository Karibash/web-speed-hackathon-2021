import { promises as fs } from 'fs';
import path from 'path';

import httpErrors from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

import { convertSound } from '../../converters/convert_sound';
import { UPLOAD_PATH } from '../../paths';
import { extractMetadataFromSound } from '../../utils/extract_metadata_from_sound';

// 変換した音声の拡張子
const EXTENSION = 'opus';
// 変換した音声のビットレート
const BITRATE = 128;

/**
 * @param {import('fastify').FastifyInstance} instance
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {(err?: Error) => void} next
 * @returns {() => void}
 */
const router = (instance, options, next) => {
  instance.post('/sounds', async (request, reply) => {
    if (request.session.userId === undefined) {
      throw new httpErrors.Unauthorized();
    }
    if (Buffer.isBuffer(request.body) === false) {
      throw new httpErrors.BadRequest();
    }

    const soundId = uuidv4();

    const { artist, title } = await extractMetadataFromSound(request.body);

    const { file, peaks } = await convertSound(request.body, {
      // 音声の拡張子を指定する
      extension: EXTENSION,
      // 音声のビットレートを指定する
      bitrate: BITRATE,
    });

    const soundFilePath = path.resolve(UPLOAD_PATH, `./sounds/${soundId}.${EXTENSION}`);
    await fs.writeFile(soundFilePath, file);

    const maxPeak = peaks.reduce((previous, current) => Math.max(previous, current));
    const svgFile = `
    <svg id="${soundId}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 1" fill="currentColor">
      ${peaks.map((peak, index) => {
      const ratio = peak / maxPeak;
      return `<rect height="${ratio}" width="1" x="${index}" y="${1 - ratio}" />`;
    }).join('')}
    </svg>
  `.replace(/\n\s+/g, '') + '\n';

    const waveFilePath =  path.resolve(UPLOAD_PATH, `./images/waves/${soundId}.svg`);
    await fs.writeFile(waveFilePath, svgFile);

    reply.status(200).type('application/json').send({ artist, id: soundId, title });
  });

  next();
};

export { router as soundRouter };
