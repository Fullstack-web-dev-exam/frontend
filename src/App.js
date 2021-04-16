import React, { Component } from 'react';
import AdminRoute from './routes/AdminRoute';
import LogInForm from './components/Login/LogInForm';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound';
import UnauthorizedCard from './components/UnauthorizedCard/UnauthorizedCard';
import PrivateRoute from './routes/PrivateRoute';
import withUsersBackEnd from './components/HOC/MyProfileHOC';
import MyProfile from './components/MyProfile/MyProfile';
import ForgotPasswordEmailForm from './components/ForgotPasswordEmailForm/ForgotPasswordEmailForm';
import forgotBackend from './components/HOC/ForgotPassHOC';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthConsumer } from './helpers/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import navBarBackend from './components/HOC/NavBarHOC';

class App extends Component {
  render() {

    const MyProfileWithHOC = withUsersBackEnd(MyProfile);
    const ForgotPassHOC = forgotBackend(ForgotPasswordEmailForm);
    const NavBarHOC = navBarBackend(NavBar);


    return (
      <AuthConsumer>
        {({ isAuth }) => (
          <>
            <Router>
              <NavBarHOC />
              <main>
                <Switch>
                  <Route exact path="/reset_password">
                    <ForgotPassHOC />
                  </Route>
                  <PrivateRoute exact path="/user">
                    <h1>Your Profile</h1>
                    <MyProfileWithHOC />
                  </PrivateRoute>
                  <PrivateRoute exact path="/dashboard">
                    <AdminRoute >
                      <Dashboard />
                    </AdminRoute>
                  </PrivateRoute>
                  <Route exact path="/logout">
                    <h1>You are now logged out!</h1>
                  </Route>
                  <Route exact path="/login">
                    <LogInForm />
                  </Route>
                  <Route exact path="/">
                    <h1>Home page</h1>
                  </Route>
                  <Route exact path="/401">
                    <UnauthorizedCard />
                  </Route>
                  <Route>
                    <NotFound />
                  </Route>
                </Switch>
              </main>
            </Router>
            <ToastContainer transition={Slide} />
          </>
        )}
      </AuthConsumer>
    );
  }
}

export default App;