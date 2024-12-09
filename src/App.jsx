import { Box, CssBaseline } from '@mui/material';
import Home from './Pages/Home/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { WeatherProvider } from './context/WeatherContext/WeatherContext';
import Detail from './Pages/Detail/Detail';

function App() {

  return (
    <WeatherProvider>
      <Box style={{height: '100vh', padding: 10}}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path='/weather'>
              {/* <Route index element={<Navigate to="/weather/search" />} /> */}
              <Route index path="search" element={<Home />} />
              <Route path="detail/:city" element={<Detail />} />
            </Route>
            <Route index element={<Navigate to="/weather/search" />} />
            <Route path="*" element={<Navigate to="/weather/search" />} /> 
          </Routes>
        </BrowserRouter>
      </Box>
    </WeatherProvider>
  )
}
export default App
