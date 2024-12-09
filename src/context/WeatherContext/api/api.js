
import weatherapiInstance from "../../../axiosIntances/weatherapiInstance";
import weatherbitInstance from "../../../axiosIntances/weatherbitInstance";

export const getCities = async (city) => weatherapiInstance.get(`/search.json?q=${city}&dt=2024-12-07`);
export const getCityWeather = async (lat, lon) => weatherapiInstance.get(`/current.json?q=${lat},${lon}`);
export const getForecast = async (lat, lon) => weatherbitInstance.get(`/forecast/3hourly?lat=${lat}&lon=${lon}&units=imperial&lang=en`);