import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container } from '@material-ui/core';

import Login from './auth';
import Dashboards from './dashboards';
import Home from './Home/pages';
import UserComplaintForm from './forms/components/UserComplaintForm';
import HodForm from './forms/components/HodForm';
import FormB from './forms/components/FormB';

const App = () => {
  return (
    <Router>
      <Container className="App">
        <Switch>
          <Redirect exact from="/" to={'/ui'} />
          <Route exact path="/ui" component={Home} />
          <Route path="/ui/login" component={Login} />
          <Route path="/ui/dashboard" component={Dashboards} />
          <Route exact path="/ui/forms/complaint" component={UserComplaintForm} />
          <Route exact path="/ui/forms/hod" component={HodForm} />
          <Route exact path='/ui/forms/formb' component={FormB} />
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
