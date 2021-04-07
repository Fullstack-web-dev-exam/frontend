import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#2E7D32' },
        pLight: { main: '#60AD5E' },
        pDark: { main: '#005005' },
        secondary: { main: '#0277BD' },
        sLight: { main: '#58AF0' },
        sDark: { main: '#004C8C' },
        tertiary: { main: '#795548' },
        tLight: { main: '#A98274' },
        tDark: { main: '#4B2C20' },
        red: { main: '#D32F2F' },
        rDark: { main: '#9A0007' },
        orange: { main: '#FF9800' },
        oDark: { main: '#C66900' },
        gray6: { main: '#F2F2F2' },
        gray5: { main: '#E0E0E0' },
        gray4: { main: '#BDBDBD' },
        gray3: { main: '#828282' },
        gray2: { main: '4F4F4F' },
        gray1: { main: '#333333' },
        background: { main: '#F9F9FA' }
    }
});

export { theme };