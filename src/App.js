import React, { Component } from 'react';
/* import AddUserForm from './components/AddUser/AddUserForm' */
import AdminRoute from './routes/AdminRoute'
import LogInForm from './components/Login/LogInForm';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound'
import PrivateRoute from './routes/PrivateRoute';
import UserList from './components/UserList/UserList';
import withUsersFetch from './components/hoc/UserListHOC';
import withUsersBackEnd from './components/hoc/MyProfileHOC';
import MyProfile from './components/MyProfile/MyProfile'

import { AuthConsumer } from './helpers/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {

    const UserListWithHOC = withUsersFetch(UserList);
    const MyProfileWithHOC = withUsersBackEnd(MyProfile);

    return (
      <AuthConsumer>
        {({ isAuth }) => (
          <Router>
            <NavBar />
            <main>
              <Switch>
                <Route exact path="/overview">
                  <p>Dette er overview-siden</p>
                </Route>
                <PrivateRoute exact path="/user/">
                  <h1>Profile</h1>
                  <MyProfileWithHOC/>
                  {/* <AddUserForm /> */}
                </PrivateRoute>
                <PrivateRoute exact path="/dashboard">
                  <AdminRoute >
                    <p>Admin siden</p>
                    <UserListWithHOC />
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
                  <p>You are not authorized!</p>
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