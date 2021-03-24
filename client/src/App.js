import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container } from '@material-ui/core';

import Login from './auth';
import Dashboards from './Dashboards/index';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <Router>
      <Container className="App">
        <Switch>
          
          <Redirect exact from="/" to={'/ui'} />
          <Route path="/ui/login" component={Login} />
          <Route path="/ui/dashboard" component={Dashboards} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
