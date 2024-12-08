import { createContext, useReducer } from "react";
import WeatherReducer, { weatherDefault } from "./Reducers/WeatherReducer";

export const WeatherContext = createContext({});

export const AppDataProvider = ({children}) => {

  const [weatherState, weatherDispatch] = useReducer( WeatherReducer, weatherDefault )

  return 

}