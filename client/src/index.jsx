import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { AppContainer } from './containers/AppContainer';
import { ModalProvider } from './contexts/ModalProvider';

window.addEventListener('load', () => {
  ReactDOM.render(
    <BrowserRouter>
      <ModalProvider>
        <AppContainer />
      </ModalProvider>
    </BrowserRouter>,
    document.getElementById('app'),
  );
});
