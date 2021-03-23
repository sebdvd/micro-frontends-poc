import { CssLoader } from '@alkem/front-project-config/react-utils';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './router';

ReactDOM.render(
  <CssLoader isFragment>
    <AppRouter />
  </CssLoader>,
  document.getElementById('root')
);
