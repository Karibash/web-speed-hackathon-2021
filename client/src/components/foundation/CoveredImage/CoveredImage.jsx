import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} src
 * @property {string} alt
 * @property {string} loading
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ src, alt, loading = 'lazy' }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <img
        className="w-full h-full max-w-none object-cover"
        src={src}
        alt={alt}
        loading={loading}
      />
    </div>
  );
};

export { CoveredImage };
