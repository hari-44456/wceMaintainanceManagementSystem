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
import Table from './Table/index';
import Hod from './Table/HOD';
import Admin from './Table/Admin';
const App = () => {
  return (
    <Router>
      <Container className="App">
        <Switch>
          <Redirect exact from="/" to={'/ui'} />
          <Route exact path="/ui" component={Home} />
          <Route path="/ui/login" component={Login} />
          <Route exact path="/ui/table" component={Table}/>
          <Route exact path="/ui/table/hod" component={Hod}/>
          <Route exact path="/ui/table/admin" component={Admin}/>
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
