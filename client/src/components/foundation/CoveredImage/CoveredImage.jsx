import classNames from 'classnames';
import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} className
 * @property {string} src
 * @property {string} alt
 * @property {string} loading
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ className, src, alt, loading = 'lazy' }) => {
  return (
    <img
      className={classNames(className, 'w-full h-full object-cover overflow-hidden')}
      src={src}
      alt={alt}
      loading={loading}
    />
  );
};

export { CoveredImage };
