import { promises as fs } from 'fs';
import path from 'path';

import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

import { convertSound } from '../../converters/convert_sound';
import { UPLOAD_PATH } from '../../paths';
import { extractMetadataFromSound } from '../../utils/extract_metadata_from_sound';

// 変換した音声の拡張子
const EXTENSION = 'opus';
// 変換した音声のビットレート
const BITRATE = 128;

const router = Router();

router.post('/sounds', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  const soundId = uuidv4();

  const { artist, title } = await extractMetadataFromSound(req.body);

  const { file, peaks } = await convertSound(req.body, {
    // 音声の拡張子を指定する
    extension: EXTENSION,
    // 音声のビットレートを指定する
    bitrate: BITRATE,
  });

  const soundFilePath = path.resolve(UPLOAD_PATH, `./sounds/${soundId}.${EXTENSION}`);
  await fs.writeFile(soundFilePath, file);

  const maxPeak = peaks.reduce((previous, current) => Math.max(previous, current));
  const svgFile = `
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 100 1" fill="currentColor">
      ${peaks.map((peak, index) => {
        const ratio = peak / maxPeak;
        return `<rect height="${ratio}" width="1" x="${index}" y="${1 - ratio}" />`;
      }).join('')}
    </svg>
  `.replace(/\n\s+/g, '') + '\n';

  const waveFilePath =  path.resolve(UPLOAD_PATH, `./images/waves/${soundId}.svg`);
  await fs.writeFile(waveFilePath, svgFile);

  return res.status(200).type('application/json').send({ artist, id: soundId, title });
});

export { router as soundRouter };
