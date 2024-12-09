import { Favorite } from '@mui/icons-material'
import { AppBar, Box, Button, CssBaseline, Toolbar } from '@mui/material'
import React, { useContext } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import Home from '../../Pages/Home/Home'
import Detail from '../../Pages/Detail/Detail'
import Favorites from '../../Pages/Favorites/Favorites'
import { doLogout } from '../../context/AuthContext/actions/authActions'
import { AuthContext } from '../../context/AuthContext/AuthContext'

const WeatherRoutes = () => {

  const navigate = useNavigate()

  const {authDispatch} = useContext(AuthContext);

  const handleLogout = () => {
    doLogout(authDispatch)
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={ () => navigate('/weather/favorites') } color="inherit"><Favorite sx={{ mr: 1 }} />Favorites</Button>
          <Button onClick={handleLogout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <Box style={{height: '100vh', padding: 10}}>
        <Routes>
          <Route path='/weather'>
            <Route index path="search" element={<Home />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="detail/:cityname" element={<Detail />} />
          </Route>
          <Route index element={<Navigate to="/weather/search" />} />
          <Route path="*" element={<Navigate to="/weather/search" />} /> 
        </Routes>
      </Box>
    </>
  )
}

export default WeatherRoutes