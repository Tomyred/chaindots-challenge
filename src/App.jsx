import { AppBar, Box, Button, createTheme, CssBaseline, IconButton, ThemeProvider, Toolbar } from '@mui/material';
import Home from './Pages/Home/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { WeatherProvider } from './context/WeatherContext/WeatherContext';
import Detail from './Pages/Detail/Detail';
import { Favorite } from '@mui/icons-material';
import Root from './Root/Root';
import { AuthProvider } from './context/AuthContext/AuthContext';

function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark', // Configura el modo oscuro por defecto
    },
  });

  return (
    <WeatherProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Root />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </WeatherProvider>
  )
}
export default App
