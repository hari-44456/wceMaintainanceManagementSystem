import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { ToastProvider } from 'react-toast-notifications';

import Login from './auth';
import Dashboards from './dashboards';
import Home from './Home/pages';
import UserComplaintForm from './forms/components/UserComplaintForm';
import HodForm from './forms/components/HodForm';
import FormB from './forms/components/FormB';

import Store from './store';

const App = () => {
  return (
    <Router>
      <Container className="App">
        <ToastProvider>
          <Switch>
            <Redirect exact from="/" to={'/ui'} />
            <Route exact path="/ui" component={Home} />
            <Route path="/ui/login" component={Login} />
            <Route path="/ui/dashboard" component={Dashboards} />
            <Route path="/ui/store" component={Store} />
            <Route
              exact
              path="/ui/forms/complaint"
              component={UserComplaintForm}
            />
            <Route exact path="/ui/forms/hod" component={HodForm} />
            <Route exact path="/ui/forms/formb" component={FormB} />
          </Switch>
        </ToastProvider>
      </Container>
    </Router>
  );
};

export default App;
