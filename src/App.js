import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LogInForm from './components/Login/LogInForm';
import AddUserForm from './components/AddUser/AddUserForm'
import NavBar from './components/NavBar/NavBar';
import UserList from './components/UserList/UserList';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute'
import { AuthConsumer } from './helpers/Auth';
import withUsersFetch from './components/hoc/UserListHOC';

class App extends Component {
  render() {

    const UserListWithHOC = withUsersFetch(UserList);

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
                  <p>Profile</p>
                  <AddUserForm />
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
              </Switch>
            </main>
          </Router>
        )}
      </AuthConsumer>
    );
  }
}

export default App;