import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';

import Login from './auth';
import Dashboards from './dashboards';
import ComplaintViews from './complaintViews';
import Home from './Home/pages';
import Header from './Home/Header';
import Forms from './forms';
import Store from './store/pages/Store';
import PageNotFound404 from './helpers/components/PageNotFound404';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Container className="App">
        <Paper elevation={3} square style={{ padding: '20px' }}>
          <Container>
            <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
            <Switch>
              <Redirect exact from="/" to={'/ui'} />
              <Route exact path="/ui" component={Home} />
              <Route
                path="/ui/login"
                render={(props) => (
                  <Login {...{ setIsLoggedIn, isLoggedIn, ...props }} />
                )}
              />

              <Route path="/ui/dashboard" component={Dashboards} />
              <Route path="/ui/forms/" component={Forms} />
              <Route exact path="/ui/store" component={Store} />
              <Route path="/ui/view" component={ComplaintViews} />
              <Route path="/ui/error" component={PageNotFound404} />
            </Switch>
          </Container>
        </Paper>
      </Container>
    </Router>
  );
};

export default App;
