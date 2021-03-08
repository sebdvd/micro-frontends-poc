import { useStyles } from '@alkem/front-project-config/react-utils';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MfeComponent } from './mfe-component';
import styles from './styles.css';

export function AppRouter() {
  useStyles(styles);
  return (
    <Router>
      <>
        <MfeComponent moduleName="@alkem/front-navbar" />
        <Switch>
          <Route path="/products">
            <MfeComponent moduleName="@alkem/front-product-catalog" />
          </Route>
          <Route path="/">
            <h1 className="Home">Hello! this is the home page.</h1>
          </Route>
        </Switch>
      </>
    </Router>
  );
}
