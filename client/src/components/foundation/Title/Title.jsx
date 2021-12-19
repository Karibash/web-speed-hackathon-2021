import React from 'react';

/**
 * @typedef {object} Props
 * @property {string} children
 */

/**
 * @type {React.VFC<Props>}
 */
const Title = ({ children: title }) => {
  React.useEffect( () => {
    document.title = title;
  }, [title] );

  return <></>;
};

export { Title };
