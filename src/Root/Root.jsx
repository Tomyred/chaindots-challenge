import React, { useContext } from 'react'
import WeatherRoutes from './Routes/WeatherRoutes'
import AuthRoutes from './Routes/AuthRoutes'
import { AuthContext } from '../context/AuthContext/AuthContext'
import { useEffect } from 'react'
import storageManager from '../helpers/storage'
import { rememberSession } from '../context/AuthContext/actions/authActions'

const Root = () => {

  const {authState, authDispatch} = useContext(AuthContext)
  const {user} = authState

  useEffect(() => {
    const email = storageManager.get('email')
    console.log({email})
    if(email){

      rememberSession(authDispatch, email)
    }
  }, [])
  

  return Object.keys(user).length > 0 ? <WeatherRoutes /> : <AuthRoutes />
}

export default Root