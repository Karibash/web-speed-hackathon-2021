import React from 'react';

import { Title } from '../Title';

/**
 * @typedef {object} Props
 * @property {string} children
 */

/**
 * @type {React.VFC<Props>}
 */
const Loading = () => {
  return (
    <div>
      <Title>読込中 - CAwitter</Title>
    </div>
  );
};

export { Loading };
