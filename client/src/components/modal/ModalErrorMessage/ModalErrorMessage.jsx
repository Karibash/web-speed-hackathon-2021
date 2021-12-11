import React from 'react';
import classNames from 'classnames';

import ExclamationCircleIcon from '../../../assets/svg/fa-exclamation-circle-solid.svg';

/**
 * @typedef {object} Props
 * @property {string | null} children
 */

/** @type {React.VFC<Props>} */
const ModalErrorMessage = ({ children }) => {
  return (
    <span className={classNames('block h-6 text-red-600', { invisible: !children })}>
      <span className="mr-1">
        <ExclamationCircleIcon className="font-awesome" />
      </span>
      {children}
    </span>
  );
};

export { ModalErrorMessage };
