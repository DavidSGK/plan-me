import React from 'react';
import { Router, Route, browserHistory } from 'react-router'
import Home from './views/Home';
import Setup from './views/Setup';
import Dashboard from './views/Dashboard';

const Routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/setup" component={Setup} />
    <Route path="/dashboard" component={Dashboard} />
  </Router>
);

export default Routes;
