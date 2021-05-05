import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login';

const LoginIndex = ({ match, setIsLoggedIn, isLoggedIn }) => {
  return (
    <Switch>
      {/* <Route
        exact
        path={`${match.url}`}
        render={(props) => <Login {...props} />}
      /> */}
      <Route
        exact
        path={`${match.url}`}
        render={(routeProps) => (
          <Login {...{ setIsLoggedIn, isLoggedIn, ...routeProps }} />
        )}
      />
    </Switch>
  );
};

export default LoginIndex;
