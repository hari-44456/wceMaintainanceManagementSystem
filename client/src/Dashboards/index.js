import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AdminDashboard from './AdminDashboard';
import HodDashboard from './HodDashboard';
import UserDashboard from './UserDashboard';

const Dashboards = ({ match }) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/student`}
        render={(props) => <UserDashboard{...props} />}
      />

      <Route
        path={`${match.url}/admin`}
        render={(props) => <AdminDashboard {...props} />}
      />

      <Route
        path={`${match.url}/hod`}
        render={(props) => <HodDashboard {...props} />}
      />
    </Switch>
  );
};

export default Dashboards;
