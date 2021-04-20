import React from 'react';
import { Switch, Route } from 'react-router-dom';

import StudentView from './StudentView';
import HodView from './HodView';
import AdminView from './AdminView';

const Dashboards = ({ match }) => {
  return (
    <Switch>
      <Route
        path={`${match.url}/student`}
        render={(props) => <StudentView {...props} />}
      />

      <Route
        path={`${match.url}/admin`}
        render={(props) => <AdminView {...props} />}
      />

      <Route
        path={`${match.url}/hod`}
        exact
        render={(props) => <HodView {...props} />}
      />
    </Switch>
  );
};

export default Dashboards;
