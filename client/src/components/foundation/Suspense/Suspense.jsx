import React from 'react';

/**
 * @typedef {object} Props
 * @property {preact.AnyComponent} children
 * @property {preact.AnyComponent} fallback
 */

/**
 * React.Suspenseのラッパーコンポーネントです
 * @type {React.VFC<Props>}
 */
const Suspense = ({ children, fallback = <div /> }) => {
  return (
    <React.Suspense fallback={fallback}>
      {children}
    </React.Suspense>
  );
};

export { Suspense };
