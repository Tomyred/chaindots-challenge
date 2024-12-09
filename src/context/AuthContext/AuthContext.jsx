import { createContext, useReducer } from "react";
import AuthReducer, { authDefault } from "./reducers/AuthReducer";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

  const [authState, authDispatch] = useReducer( AuthReducer, authDefault )

  const contextValue = {authState, authDispatch}

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )

}