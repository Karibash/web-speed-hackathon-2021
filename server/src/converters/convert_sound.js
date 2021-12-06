import { ffmpeg } from '../ffmpeg';

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @param {number} [options.bitrate]
 * @returns {Promise<Uint8Array>}
 */
async function convertSound(buffer, options) {
  const exportFile = `export.${options.extension ?? 'opus'}`;

  if (ffmpeg.isLoaded() === false) {
    await ffmpeg.load();
  }

  ffmpeg.FS('writeFile', 'file', new Uint8Array(buffer));

  await ffmpeg.run(...['-i', 'file', '-vn', exportFile, '-b:a', `${options.bitrate ?? 128}k`]);

  return ffmpeg.FS('readFile', exportFile);
}

export { convertSound };
