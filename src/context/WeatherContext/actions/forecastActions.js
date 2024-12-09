import { fahrenheitToCelsius, formatDateToHashKey, formatTime, mpsToKmh } from '../../../helpers/utils'
import { getForecast } from '../api/api'
import * as types from './types'
import data from '../../../mocks/5dayForecast.json'

export const searchForecast = async (dispatch, lat, lon) => {
  try {
    dispatch({
      type: types.FORECAST_LOAD_INIT
    })

    // const {data: {data} } = await getForecast(lat, lon)

    // const data = [
    //   {
    //     "snow_depth": 0,
    //     "pop": 0,
    //     "ozone": 295,
    //     "clouds_hi": 0,
    //     "clouds_low": 0,
    //     "clouds_mid": 67,
    //     "wind_cdir": "SE",
    //     "rh": 69,
    //     "pod": "n",
    //     "pres": 959,
    //     "clouds": 0,
    //     "vis": 14.9,
    //     "timestamp_local": "2024-12-09T06:00:00",
    //     "wind_cdir_full": "southeast",
    //     "slp": 1015,
    //     "datetime": "2024-12-09:09",
    //     "ts": 1733734800,
    //     "snow": 0,
    //     "dewpt": 47.8,
    //     "dni": 0,
    //     "uv": 0,
    //     "timestamp_utc": "2024-12-09T09:00:00",
    //     "wind_dir": 128,
    //     "ghi": 0,
    //     "dhi": 0,
    //     "wind_gust_spd": 6.7,
    //     "precip": 0,
    //     "weather": {
    //       "code": 802,
    //       "icon": "c02n",
    //       "description": "Scattered clouds"
    //     },
    //     "solar_rad": 0,
    //     "temp": 57.9,
    //     "wind_spd": 0.4,
    //     "app_temp": 57.9
    //   },
    //   {
    //     "snow_depth": 0,
    //     "pop": 0,
    //     "ozone": 295,
    //     "clouds_hi": 0,
    //     "clouds_low": 0,
    //     "clouds_mid": 67,
    //     "wind_cdir": "SE",
    //     "rh": 69,
    //     "pod": "n",
    //     "pres": 959,
    //     "clouds": 0,
    //     "vis": 14.9,
    //     "timestamp_local": "2024-12-09T06:00:00",
    //     "wind_cdir_full": "southeast",
    //     "slp": 1015,
    //     "datetime": "2024-12-09:09",
    //     "ts": 1733734800,
    //     "snow": 0,
    //     "dewpt": 47.8,
    //     "dni": 0,
    //     "uv": 0,
    //     "timestamp_utc": "2024-12-09T09:00:00",
    //     "wind_dir": 128,
    //     "ghi": 0,
    //     "dhi": 0,
    //     "wind_gust_spd": 6.7,
    //     "precip": 0,
    //     "weather": {
    //       "code": 802,
    //       "icon": "c02n",
    //       "description": "Scattered clouds"
    //     },
    //     "solar_rad": 0,
    //     "temp": 57.9,
    //     "wind_spd": 0.4,
    //     "app_temp": 57.9
    //   },
    //   {
    //     "snow_depth": 0,
    //     "pop": 0,
    //     "ozone": 295,
    //     "clouds_hi": 0,
    //     "clouds_low": 0,
    //     "clouds_mid": 67,
    //     "wind_cdir": "SE",
    //     "rh": 69,
    //     "pod": "n",
    //     "pres": 959,
    //     "clouds": 0,
    //     "vis": 14.9,
    //     "timestamp_local": "2024-12-09T06:00:00",
    //     "wind_cdir_full": "southeast",
    //     "slp": 1015,
    //     "datetime": "2024-12-10:09",
    //     "ts": 1733734800,
    //     "snow": 0,
    //     "dewpt": 47.8,
    //     "dni": 0,
    //     "uv": 0,
    //     "timestamp_utc": "2024-12-09T09:00:00",
    //     "wind_dir": 128,
    //     "ghi": 0,
    //     "dhi": 0,
    //     "wind_gust_spd": 6.7,
    //     "precip": 0,
    //     "weather": {
    //       "code": 802,
    //       "icon": "c02n",
    //       "description": "Scattered clouds"
    //     },
    //     "solar_rad": 0,
    //     "temp": 57.9,
    //     "wind_spd": 0.4,
    //     "app_temp": 57.9
    //   },
    //   {
    //     "snow_depth": 0,
    //     "pop": 0,
    //     "ozone": 295,
    //     "clouds_hi": 0,
    //     "clouds_low": 0,
    //     "clouds_mid": 67,
    //     "wind_cdir": "SE",
    //     "rh": 69,
    //     "pod": "n",
    //     "pres": 959,
    //     "clouds": 0,
    //     "vis": 14.9,
    //     "timestamp_local": "2024-12-09T06:00:00",
    //     "wind_cdir_full": "southeast",
    //     "slp": 1015,
    //     "datetime": "2024-12-10:09",
    //     "ts": 1733734800,
    //     "snow": 0,
    //     "dewpt": 47.8,
    //     "dni": 0,
    //     "uv": 0,
    //     "timestamp_utc": "2024-12-09T09:00:00",
    //     "wind_dir": 128,
    //     "ghi": 0,
    //     "dhi": 0,
    //     "wind_gust_spd": 6.7,
    //     "precip": 0,
    //     "weather": {
    //       "code": 802,
    //       "icon": "c02n",
    //       "description": "Scattered clouds"
    //     },
    //     "solar_rad": 0,
    //     "temp": 57.9,
    //     "wind_spd": 0.4,
    //     "app_temp": 57.9
    //   },
    //   {
    //     "snow_depth": 0,
    //     "pop": 0,
    //     "ozone": 295,
    //     "clouds_hi": 0,
    //     "clouds_low": 0,
    //     "clouds_mid": 67,
    //     "wind_cdir": "SE",
    //     "rh": 69,
    //     "pod": "n",
    //     "pres": 959,
    //     "clouds": 0,
    //     "vis": 14.9,
    //     "timestamp_local": "2024-12-09T06:00:00",
    //     "wind_cdir_full": "southeast",
    //     "slp": 1015,
    //     "datetime": "2024-12-11:09",
    //     "ts": 1733734800,
    //     "snow": 0,
    //     "dewpt": 47.8,
    //     "dni": 0,
    //     "uv": 0,
    //     "timestamp_utc": "2024-12-09T09:00:00",
    //     "wind_dir": 128,
    //     "ghi": 0,
    //     "dhi": 0,
    //     "wind_gust_spd": 6.7,
    //     "precip": 0,
    //     "weather": {
    //       "code": 802,
    //       "icon": "c02n",
    //       "description": "Scattered clouds"
    //     },
    //     "solar_rad": 0,
    //     "temp": 57.9,
    //     "wind_spd": 0.4,
    //     "app_temp": 57.9
    //   },
    //   {
    //     "snow_depth": 0,
    //     "pop": 0,
    //     "ozone": 295,
    //     "clouds_hi": 0,
    //     "clouds_low": 0,
    //     "clouds_mid": 67,
    //     "wind_cdir": "SE",
    //     "rh": 69,
    //     "pod": "n",
    //     "pres": 959,
    //     "clouds": 0,
    //     "vis": 14.9,
    //     "timestamp_local": "2024-12-09T06:00:00",
    //     "wind_cdir_full": "southeast",
    //     "slp": 1015,
    //     "datetime": "2024-12-11:09",
    //     "ts": 1733734800,
    //     "snow": 0,
    //     "dewpt": 47.8,
    //     "dni": 0,
    //     "uv": 0,
    //     "timestamp_utc": "2024-12-09T09:00:00",
    //     "wind_dir": 128,
    //     "ghi": 0,
    //     "dhi": 0,
    //     "wind_gust_spd": 6.7,
    //     "precip": 0,
    //     "weather": {
    //       "code": 802,
    //       "icon": "c02n",
    //       "description": "Scattered clouds"
    //     },
    //     "solar_rad": 0,
    //     "temp": 57.9,
    //     "wind_spd": 0.4,
    //     "app_temp": 57.9
    //   },
    // ];

    const forecastMap = {}

    data.forEach((fc) => {
      const dateKey = formatDateToHashKey(fc.datetime.slice(0, 10));
      
      const measurement = {
        temp: fahrenheitToCelsius(fc.temp).toFixed(1),
        humidity: fc.rh,
        windSpeed: mpsToKmh(fc.wind_spd).toFixed(1),
        time: formatTime(fc.timestamp_local),
        condition: fc.weather.description
      };
  
      if (!forecastMap[dateKey]) {
        forecastMap[dateKey] = [];
      }
  
      if (forecastMap[dateKey].length < 8) {
        forecastMap[dateKey].push(measurement);
      }
    });

    dispatch({
      type: types.FORECAST_LOAD_SUCCESS,
      payload: forecastMap
    })
    
  } catch (error) {
    console.log({error})
    dispatch({
      type: types.FORECAST_LOAD_FAILED
    })
  }
}