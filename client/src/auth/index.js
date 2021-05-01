import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';

const LoginIndex = ({ match }) => {
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={(props) => <Login {...props} />}
      />
    </Switch>
  );
};

export default LoginIndex;
