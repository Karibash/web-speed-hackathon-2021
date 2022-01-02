import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { SWRConfig } from 'swr';

import { AppContainer } from './containers/AppContainer';

loadableReady(() => {
  const fallbackElement = document.getElementById('fallback');
  const fallback = JSON.parse(fallbackElement.textContent);
  ReactDOM.hydrate(
    <BrowserRouter>
      <SWRConfig value={{ fallback }}>
        <AppContainer />
      </SWRConfig>
    </BrowserRouter>,
    document.getElementById('app'),
  );
});
