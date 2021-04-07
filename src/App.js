//import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import MenuAppBar from './components/AppBar';
import { theme } from './colors';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MenuAppBar />
      <p>Dette er en test for å se om branch AppBar fungerer lmao</p>
    </ThemeProvider>
  );
}

export default App;