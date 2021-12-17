import React from 'react';
import { useRoute } from 'preact-iso';
import classNames from 'classnames';

/**
 * @typedef {object} Props
 * @property {string} className
 * @property {string} activeClassName
 * @property {string} to
 * @property {preact.ComponentChildren} children
 * @property {preact.JSXInternal.MouseEventHandler} onClick
 */

/**
 * @type {React.VFC<Props>}
 */
const Link = ({ className: baseClassName, activeClassName, to, children, onClick }) => {
  const { path } = useRoute();
  const className = React.useMemo(() => {
    return classNames(baseClassName, { [activeClassName]: path === to });
  }, [baseClassName, activeClassName, to, path]);

  return (
    <a className={className} href={to} onClick={onClick}>
      {children}
    </a>
  );
};

export { Link };
