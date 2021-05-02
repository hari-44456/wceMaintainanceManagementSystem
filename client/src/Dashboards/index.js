import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import AdminDashboard from './AdminDashboard';
import HodDashboard from './HodDashboard';
import UserDashboard from './UserDashboard';
import axiosInstance from '../helpers/axiosInstance';
import ComplaintView from '../complaintViews';

const Dashboards = ({ match }) => {
  const history = useHistory();

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const result = await axiosInstance.get('/api/isAuthenticated');
        if (!result.data.success) history.push('/ui');
      } catch (error) {
        history.push('/ui');
      }
    };
    isAuthenticated();
  }, [history]);

  return (
    <Switch>
      <Route
        path={`${match.url}/student`}
        render={(props) => <UserDashboard {...props} />}
      />

      <Route
        path={`${match.url}/admin`}
        render={(props) => <AdminDashboard {...props} />}
      />

      <Route
        path={`${match.url}/hod`}
        render={(props) => <HodDashboard {...props} />}
      />
      <Route
        path={`${match.url}/view`}
        render={(props) => <ComplaintView {...props} />}
      />
    </Switch>
  );
};

export default Dashboards;
