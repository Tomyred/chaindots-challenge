import { v4 } from 'uuid'
import { getUserByEmail, insertNewUser } from '../../../services/db'
import * as types from './types'
import storageManager from '../../../helpers/storage'

export const doLogin = (dispatch, email, password) => {
  try {
    const user = getUserByEmail(email)

    if(email === user.email && password === user.password){
      storageManager.set('email', user.email)
      dispatch({
        type: types.LOGIN_LOAD_SUCCESS,
        payload: user
      })
    }else{
      dispatch({
        type: types.REGISTER_LOAD_FAILED,
        payload: 'incorrect username or password'
      })
    }

  } catch (error) {
    dispatch({
      type: types.REGISTER_LOAD_FAILED,
      payload: 'an error has ocurred'
    })
  }
}

export const doLogout = (dispatch) => {
  storageManager.remove('email')
  dispatch({
    type: types.LOGIN_RESET_STATE,
  })
}

export const rememberSession = (dispatch, email) => {
  try {
    const user = getUserByEmail(email)

    if(user){
      dispatch({
        type: types.LOGIN_LOAD_SUCCESS,
        payload: user
      })
    }


  } catch (error) {
    dispatch({
      type: types.LOGIN_LOAD_FAILED,
    })
  }
}

export const saveNewUser = (dispatch, user) => {

  try {

    const newUser = {
      ...user,
      id: v4()
    }

    const savedUser = insertNewUser(newUser)
    if(savedUser){

      storageManager.set('email', savedUser.email)
  
      dispatch({
        type: types.REGISTER_SAVE_SUCCESS,
        payload: savedUser
      })
    }else {
      dispatch({
        type: types.REGISTER_LOAD_FAILED,
        payload: 'user not saved'
      })
    }
    
    
  } catch (error) {
    dispatch({
      type: types.REGISTER_LOAD_FAILED,
      payload: error.message
    })
  }

}