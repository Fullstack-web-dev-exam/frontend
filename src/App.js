import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MenuAppBar from './components/AppBar';
import { theme } from './colors';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <MenuAppBar />
        <main>
          <Switch>
            <Route exact path="/overview">
              <p>Dette er en test for å se om branch AppBar fungerer lmao</p>
            </Route>
            <Route exact path="/profile">
              <p>Profile</p>
            </Route>
            <Route exact path="/admin">
              <p>Admin siden</p>
            </Route>
            <Route exact path="/logout">
              <p>You are now logged out!</p>
            </Route>
            <Route exact path="/">
              <p>Hjemmesiden</p>
            </Route>
          </Switch>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;