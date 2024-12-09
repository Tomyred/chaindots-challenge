export const authDefault = {
  loading: false,
  loaded: false,
  loadingError: false,
  user: {},
  registerError: '',
  loginError: ''
}

export default (state = authDefault, action) => {
  const {type, payload} = action
  console.log({type, payload})
  switch (type) {
    case 'LOGIN_LOAD_SUCCESS':
      
      return {
        ...state,
        loading: false,
        loaded: true,
        loadingError: false,
        user: payload
      }

    case 'LOGIN_LOAD_FAILED':
      
      return {
        ...state,
        loading: false,
        loaded: false,
        loadingError: true,
        loginError: payload
      }

    case 'REGISTER_SAVE_SUCCESS':
      
      return {
        ...state,
        loading: false,
        loaded: true,
        loadingError: false,
        user: payload
      }

    case 'REGISTER_LOAD_FAILED':
      
      return {
        ...state,
        loading: false,
        loaded: false,
        loadingError: true,
        registerError: payload
      }
    
    case 'LOGIN_RESET_STATE':

      return authDefault
  
    default:
      return state
  }

}