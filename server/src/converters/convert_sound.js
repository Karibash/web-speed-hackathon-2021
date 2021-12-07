import { ffmpeg } from '../ffmpeg';

const SAMPLE_CHUNK_OFFSET = 78;

/**
 * @param {Buffer} buffer
 * @param {object} options
 * @param {number} [options.extension]
 * @param {number} [options.bitrate]
 * @param {number} [options.chunkCount]
 * @returns {Promise<{ file: Uint8Array, peaks: number[] }>}
 */
async function convertSound(buffer, options) {
  const exportFile = `export.${options.extension ?? 'opus'}`;

  if (ffmpeg.isLoaded() === false) {
    await ffmpeg.load();
  }

  ffmpeg.FS('writeFile', 'file', new Uint8Array(buffer));

  await ffmpeg.run(...['-i', 'file', '-vn', exportFile, '-b:a', `${options.bitrate ?? 128}k`]);
  await ffmpeg.run(...['-i', 'file', '-c:a', 'pcm_u8', '-ac', '2', 'export.wav']);

  const samples = ffmpeg.FS('readFile', 'export.wav')
    .slice(SAMPLE_CHUNK_OFFSET)
    .reduce((previous, current, index) => {
      const peak = Math.abs((current - 128) / 128);
      if (index % 2 === 0) previous.push([]);
      previous[Math.floor(index / 2)].push(peak);
      return previous;
    }, [])
    .reduce((previous, current) => {
      const total = current.reduce((previous, current) => previous + current, 0);
      previous.push(total / current.length);
      return previous;
    }, []);

  const chunkCount = options.chunkCount ?? 100;
  const chunkSize = Math.ceil(samples.length / chunkCount);
  const peaks = [...Array(chunkCount)]
    .reduce((previous, _, index) => {
      const chunk = samples.slice(chunkSize * index, chunkSize * (index + 1));
      const total = chunk.reduce((previous, current) => previous + current, 0);
      previous.push(total / chunk.length);
      return previous;
    }, []);

  return { file: ffmpeg.FS('readFile', exportFile), peaks };
}

export { convertSound };
