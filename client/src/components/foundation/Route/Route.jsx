import React from 'react';
import { Route as RouteBase } from 'preact-iso'

import { Suspense } from '../Suspense';

/**
 * @typedef {object} Props
 * @property {string} path
 * @property {preact.AnyComponent} component
 * @property {preact.AnyComponent} fallback
 */

/**
 * @type {React.VFC<Props>}
 */
const Route = ({ path, component: Component, fallback, ...props }) => {
  const render = React.useCallback(() => {
    return (
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    );
  }, [Component, props]);

  return (
    <RouteBase path={path} component={render} />
  );
};

export { Route };
