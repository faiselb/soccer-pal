import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Myaccount from './components/myaccount/Myaccount';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Profile from './components/profile/Profile';
import Profiles from './components/profiles/Profiles';
import NotFound from './components/not-found/NotFound';

import './App.css';

if (localStorage.jwtToken) {
  
  setAuthToken(localStorage.jwtToken);
  
  const decoded = jwt_decode(localStorage.jwtToken);
  
  store.dispatch(setCurrentUser(decoded));

  
  const currentTime = Date.now() / 1000;
  if (decoded.cmeetup < currentTime) {
    
    store.dispatch(logoutUser());
    
    store.dispatch(clearCurrentProfile());
    
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (      
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />

              <Switch>
                <PrivateRoute exact path="/myaccount" component={Myaccount} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
