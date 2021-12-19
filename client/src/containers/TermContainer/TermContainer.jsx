import React from 'react';

import { Title } from '../../components/foundation/Title';
import { TermPage } from '../../components/term/TermPage';

/** @type {React.VFC} */
const TermContainer = () => {
  return (
    <>
      <Title>利用規約 - CAwitter</Title>
      <TermPage />
    </>
  );
};

export { TermContainer };
