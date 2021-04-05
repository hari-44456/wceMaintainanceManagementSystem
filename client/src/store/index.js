import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import Store from './pages/Store';
import axiosInstance from '../helpers/axiosInstance';

const Dashboards = ({ match }) => {
  const history = useHistory();

  //   useEffect(() => {
  //     const isAuthenticated = async () => {
  //       try {
  //         const result = await axiosInstance.get('/api/isAuthenticated');
  //         if (!result.data.success) history.push('/ui');
  //       } catch (error) {
  //         history.push('/ui');
  //       }
  //     };
  //     isAuthenticated();
  //   }, []);

  return (
    <Switch>
      <Route path={`${match.url}/`} render={(props) => <Store {...props} />} />
    </Switch>
  );
};

export default Dashboards;
