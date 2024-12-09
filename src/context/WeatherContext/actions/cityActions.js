import * as api from '../api/api'
import * as types from './types'

export const searchCity = async (dispatch, city = '') => {
  dispatch({
    type: types.CITY_SEARCH_LOAD_INIT
  })
  if(city.length > 0){
    try {
      const cityStr = city.trim().replace(" ", "+");
      const res = await api.getCities(cityStr);
      const resultsAux = res.data.map(async city => searchCityWeather(city.lat, city.lon));
      const citiesStatus = await Promise.all(resultsAux);
      console.log({citiesStatus})
      dispatch({
        type: types.CITY_SEARCH_LOAD_SUCCESS,
        payload: citiesStatus
      })
    
    } catch (error) {
      console.log(error);
      dispatch({
        type: types.CITY_SEARCH_LOAD_FAILED
      })
    
    }
  }else{
    resetState(dispatch)
  }
}

const searchCityWeather = async (lat, lon) => {
  const { data } = await api.getCityWeather(lat, lon)
  console.log({data})
  return {
    displayName: `${data.location.name}, ${data.location.region}, ${data.location.country}`,
    lat,
    lon,
    temp: data.current.temp_c,
    city: data.location.name,
    condition: data.current.condition.text,
    icon: data.current.condition.icon,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_kph
  }
}

export const resetState = (dispatch) => {
  dispatch({
    type:  types.RESET_STATE
  })
}
