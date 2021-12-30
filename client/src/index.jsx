import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import { AppContainer } from './containers/AppContainer';

loadableReady(() => {
  ReactDOM.hydrate(
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>,
    document.getElementById('app'),
  );
});
