import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from './containers/AppContainer';
import { ModalProvider } from './contexts/ModalProvider';

window.addEventListener('load', () => {
  ReactDOM.render(
    <ModalProvider>
      <AppContainer />
    </ModalProvider>,
    document.getElementById('app'),
  );
});
