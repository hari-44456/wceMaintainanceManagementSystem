import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Container, Paper } from '@material-ui/core';

import Login from './auth';
import Dashboards from './Dashboards/index';
import ComplaintViews from './complaintViews';
import Header from './LandingPage/Header';
import Forms from './forms';
import Store from './store/pages/Store';
import Contact from './LandingPage/Contactpage';
import Help from './LandingPage/Help';
import PageNotFound404 from './helpers/components/PageNotFound404';
import landing from './LandingPage/index.js';
import Footer from './LandingPage/Footer';
import Report from './Dashboards/Report';
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
              <Route exact path="/ui/landing" component={landing} />
              <Route exact path="/ui/help" component={Help} />
              <Route exact path="/ui/contactPage" component={Contact} />
              <Route exact path="/ui" component={landing} />
              <Route path="/ui/forms/Report" component={Report} />
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

              <Redirect to="/ui/error" />
            </Switch>
          </Container>
        </Paper>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
