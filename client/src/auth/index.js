import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AdminLogin from './pages/AdminLogin';
import HodLogin from './pages/HoDLogin';
import StudentLogin from './pages/StudentLogin';
import MaintenanceCommiteeLogin from './pages/MaintenanceCommiteeLogin';

const Login = ({ match }) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/admin`}
        render={(props) => <AdminLogin {...props} />}
      />

      <Route
        path={`${match.url}/hod`}
        render={(props) => <HodLogin {...props} />}
      />

      <Route
        path={`${match.url}/student`}
        render={(props) => <StudentLogin {...props} />}
      />

      <Route
        path={`${match.url}/commitee`}
        render={(props) => <MaintenanceCommiteeLogin {...props} />}
      />
    </Switch>
  );
};

export default Login;
