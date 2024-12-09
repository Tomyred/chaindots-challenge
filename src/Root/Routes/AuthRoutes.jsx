import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Login from '../../Pages/Auth/Login'
import Register from '../../Pages/Auth/Register'
import { Box } from '@mui/material'

const AuthRoutes = () => {
  return (
    <Box alignContent={'center'} style={{height: '100vh', padding: 10}}>
      <Routes>
        <Route path='/auth'>
          <Route index path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route index element={<Navigate to="/auth/login" />} />
        <Route path="*" element={<Navigate to="/auth/login" />} /> 
      </Routes>
    </Box>
  )
}

export default AuthRoutes