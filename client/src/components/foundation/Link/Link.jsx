import React from 'react';
import { NavLink } from 'react-router-dom';
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
const Link = ({ className, activeClassName, to, children, onClick }) => {
  return (
    <NavLink
      className={props => classNames(className, { [activeClassName]: props.isActive })}
      to={to}
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};

export { Link };
