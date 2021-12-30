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
  return <Title>読込中 - CAwitter</Title>;
};

export { Loading };
