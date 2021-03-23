import { MfeComponent } from '@alkem/front-project-config/mfe-component';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles.css';

export function AppRouter() {
  return (
    <Router>
      <>
        <MfeComponent moduleName="@alkem/front-navbar" />
        <Switch>
          <Route path="/products">
            <MfeComponent moduleName="@alkem/front-product-catalog" />
          </Route>
          <Route path="/">
            <h1 className="FrontRoot">Hello! this is the home page.</h1>
          </Route>
        </Switch>
      </>
    </Router>
  );
}
