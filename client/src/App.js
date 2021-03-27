import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';

import Login from './auth';
import Dashboards from './Dashboards';
import Form from './forms/UserComplaintForm';

import '../node_modules/bootstrap/dist/css/bootstrap.css';

const App = () => {
  return (
    <Router>
      <Container className="App">
        <Paper>
          <Container>
            <Switch>
              <Redirect exact from="/" to={'/ui'} />
              <Route path="/ui/login" component={Login} />
              <Route path="/ui/dashboard" component={Dashboards} />
              <Route path="/ui/form" component={Form} />
            </Switch>
          </Container>
        </Paper>
      </Container>
    </Router>
  );
};

export default App;
