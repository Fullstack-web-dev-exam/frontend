import React, { Component } from 'react';
import AdminRoute from './routes/AdminRoute'
import LogInForm from './components/Login/LogInForm';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound'
import UnauthorizedCard from './components/UnauthorizedCard/UnauthorizedCard'
import PrivateRoute from './routes/PrivateRoute';
import withUsersBackEnd from './components/hoc/MyProfileHOC';
import MyProfile from './components/MyProfile/MyProfile'
import ForgotPasswordEmailForm from './components/ForgotPasswordEmailForm/ForgotPasswordEmailForm'

import { AuthConsumer } from './helpers/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
  render() {

    const MyProfileWithHOC = withUsersBackEnd(MyProfile);

    return (
      <AuthConsumer>
        {({ isAuth }) => (
          <Router>
            <NavBar />
            <main>
              <Switch>
              <Route exact path="/reset_password">
                  <ForgotPasswordEmailForm/>
                </Route>
                <PrivateRoute exact path="/user">
                  <h1>Your Profile</h1>
                  <MyProfileWithHOC/>
                </PrivateRoute>
                <PrivateRoute exact path="/dashboard">
                  <AdminRoute >
                    <Dashboard />
                  </AdminRoute>
                </PrivateRoute>
                <Route exact path="/logout">
                  <p>You are now logged out!</p>
                </Route>
                <Route exact path="/login">
                  <LogInForm />
                </Route>
                <Route exact path="/">
                  <p>Hjemmesiden</p>
                </Route>
                <Route exact path="/401">
                  <UnauthorizedCard/>
                </Route>
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </main>
          </Router>
        )}
      </AuthConsumer>
    );
  }
}

export default App;