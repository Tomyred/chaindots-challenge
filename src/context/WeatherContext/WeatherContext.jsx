import { createContext, useReducer } from "react";
import CityReducer, { cityDefault } from "./reducers/CityReducer";
import ForecastReducer, { forecastDefault } from "./reducers/ForecastReducer";

export const WeatherContext = createContext({});

export const WeatherProvider = ({children}) => {

  const [cityState, cityDispatch] = useReducer( CityReducer, cityDefault )
  const [forecastState, forecastDispatch] = useReducer( ForecastReducer, forecastDefault )

  const contextValue = {
    cityState, 
    forecastState,

    cityDispatch,
    forecastDispatch,
  }

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  )

}