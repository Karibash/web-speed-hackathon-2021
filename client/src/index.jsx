import React from 'react';
import ReactDOM from 'react-dom';
import { LocationProvider, ErrorBoundary } from 'preact-iso';

import { AppContainer } from './containers/AppContainer';
import { ModalProvider } from './contexts/ModalProvider';

window.addEventListener('load', () => {
  ReactDOM.render(
    <LocationProvider>
      <ErrorBoundary>
        <ModalProvider>
          <AppContainer />
        </ModalProvider>
      </ErrorBoundary>
    </LocationProvider>,
    document.getElementById('app'),
  );
});
