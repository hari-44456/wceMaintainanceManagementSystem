import React, { useState, useEffect } from 'react';
import UserDashboard from './Dashboards/UserDashboard';
import HodDashboard from './Dashboards/HodDashboard';
import AdminDashboard from './Dashboards/AdminDashboard';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {BrowserRouter as Router,Route,Switch,withRouter} from "react-router-dom";
import axiosInstance from './helpers/axiosInstance';

const App = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosInstance.get('/');
        console.log(response);
        if (response.data.success) setMessage(response.data.message);
        else {
          try {
            setError(response.data.error);
          } catch (error) {
            setError('Error occured');
          }
        }
      } catch (error) {
        try {
          setError(error.response.data.error);
        } catch (error) {
          setError('Error Occured...');
        }
      }
    };
    getData();
  });

  return (
    <Router>
      <div className="App">
        

        <Switch>
          
          <Route exact path="/UserDashboard" component={UserDashboard} />
          <Route exact path="/HodDashboard" component={HodDashboard} />
          <Route exact path="/AdminDashboard" component={AdminDashboard} />
        </Switch>
      </div>
    </Router>
    
  );
};

export default App;
