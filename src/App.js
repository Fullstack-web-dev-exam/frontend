import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MenuAppBar from './components/AppBar';
/* import LogInForm from './components/LogInForm' */
import AddUserForm from './components/AddUserForm'
import { theme } from './colors';
import PrivateRoute from './routes/PrivateRoute';
import { AuthConsumer } from './helpers/Auth';

function App() {
  return (
    <AuthConsumer>
      {({ isAuth }) => (
        <ThemeProvider theme={theme}>
          <Router>
            <MenuAppBar />
            <main>
              <Switch>
                <Route exact path="/overview">
                  <p>Dette er en test for å se om branch AppBar fungerer lmao</p>
                </Route>
                <PrivateRoute exact path="/user">
                  <p>Profile</p>
                </PrivateRoute>
                <PrivateRoute exact path="/dashboard">
                  <p>Admin siden</p>
                </PrivateRoute>
                <Route exact path="/logout">
                  <p>You are now logged out!</p>
                </Route>
                <Route exact path="/login">
                  {/* <LogInForm/> */}
                  <AddUserForm/>
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
        </ThemeProvider>
      )}
    </AuthConsumer>
  );
}

export default App;