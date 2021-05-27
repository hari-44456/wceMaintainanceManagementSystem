import React from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';

import Store from './pages/Store';

const Dashboards = ({ match }) => {
  const history = useHistory();

  return (
    <Switch>
      <Route path={`${match.url}/`} render={(props) => <Store {...props} />} />
      <Redirect to="/ui/error" />
    </Switch>
  );
};

export default Dashboards;
