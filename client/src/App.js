import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';

import Login from './auth';
import Dashboards from './dashboards';
import ComplaintViews from './complaintViews';
import Home from './Home/pages';

import Forms from './forms';
import Store from './store/pages/Store';

const App = () => {
  return (
    <Router>
      <Container className="App">
        <Paper elevation={3} square style={{ padding: '20px' }}>
          <Container>
            <Switch>
              <Redirect exact from="/" to={'/ui'} />
              <Route exact path="/ui" component={Home} />
              <Route path="/ui/login" component={Login} />
              <Route path="/ui/dashboard" component={Dashboards} />
              <Route path="/ui/forms/" component={Forms} />
              <Route exact path="/ui/store" component={Store} />
              <Route path="/ui/view" component={ComplaintViews} />
            </Switch>
          </Container>
        </Paper>
      </Container>
    </Router>
  );
};

export default App;
