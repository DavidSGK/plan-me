import React from 'react';
import { Router, Route, IndexRoute } from 'react-router'
import Root from './root';
import Home from './views/Home';
import Setup from './views/Setup';
import Dashboard from './views/Dashboard';
import Header from './views/layouts/Header';

const Routes = ({ history }) => (
  <Router history={history}>
    <Header />
    <Route path="/" component={Root}>
      <IndexRoute component={Home} />
      <Route
        path="/setup"
        component={Setup}
      />
      <Route
        path="/dashboard"
        component={Dashboard}
      />
    </Route>
  </Router>
);

export default Routes;
