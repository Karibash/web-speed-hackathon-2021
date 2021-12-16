import React from 'react';
import { Link as LinkBase } from 'preact-router/match';

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
const Link = ({ className, activeClassName, to, children, onClick }) => {
  // HACK: activeClassNameを使用する際に、classNameを併用する事が出来ないのでclassを使用するようにする
  // https://github.com/preactjs/preact-router/pull/386
  return (
    <LinkBase class={className} activeClassName={activeClassName} href={to} onClick={onClick}>
      {children}
    </LinkBase>
  );
};

export { Link };
