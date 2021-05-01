import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import UserComplaintForm from './components/UserComplaintForm';
import HodForm from './components/HodForm';
import FormB from './components/FormB2';
import axiosInstance from '../helpers/axiosInstance';

const Forms = ({ match }) => {
  const history = useHistory();

  useEffect(() => {
    const isAuthenticated = async () => {
      try {
        const result = await axiosInstance.get('/api/isAuthenticated');
        if (!result.data.success) history.push('/ui/login');
      } catch (error) {
        history.push('/ui/login');
      }
    };
    isAuthenticated();
  }, []);

  return (
    <Switch>
      <Route
        path={`${match.url}/complaint`}
        render={(props) => <UserComplaintForm {...props} />}
      />

      <Route
        path={`${match.url}/hod`}
        render={(props) => <HodForm {...props} />}
      />

      <Route
        path={`${match.url}/formb`}
        render={(props) => <FormB {...props} />}
      />
    </Switch>
  );
};

export default Forms;
