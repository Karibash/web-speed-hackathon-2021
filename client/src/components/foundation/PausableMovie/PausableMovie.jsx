import React from 'react';
import classNames from 'classnames';

import PauseIcon from '../../../assets/svg/fa-pause-solid.svg';
import PlayIcon from '../../../assets/svg/fa-play-solid.svg';
import { AspectRatioBox } from '../AspectRatioBox';

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = ({ src }) => {
  /** @type {React.RefObject<HTMLVideoElement>} */
  const videoRef = React.useRef(null);

  const [isPlaying, setIsPlaying] = React.useState(true);

  React.useEffect(() => {
    if (window === undefined) return;
    const isAutoPlay = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsPlaying(!isAutoPlay);
    if (isAutoPlay) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  }, []);

  const handleClick = React.useCallback(() => {
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        videoRef.current?.pause();
      } else {
        videoRef.current?.play();
      }
      return !isPlaying;
    });
  }, []);

  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1}>
      <button className="group relative block w-full h-full" onClick={handleClick} type="button">
        <video className="w-full h-full object-cover" src={src} ref={videoRef} loop playsInline muted />
        <div
          className={classNames(
            'absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2',
            {
              'opacity-0 group-hover:opacity-100': isPlaying,
            },
          )}
        >
          {isPlaying ? <PauseIcon className="font-awesome" /> : <PlayIcon className="font-awesome" />}
        </div>
      </button>
    </AspectRatioBox>
  );
};

export { PausableMovie };
