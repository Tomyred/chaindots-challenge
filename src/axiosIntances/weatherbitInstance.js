import axios from "axios";

// el codigo de ambos interceptores es identico y podria haber reutilizado codigo.
// Sin embargo, los mantengo por separado dado que en una 
// aplicacion mas grande podriar tener necesidades mas especificas que tengan que sean tratadas individualmente
const TRACE = true //todo: move to env variables

const weatherbitInstance = axios.create({
  baseURL: 'https://weatherbit-v1-mashape.p.rapidapi.com/',
  timeout: 2000,
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_WEATHERBIT_KEY, //todo: move to env variables
    'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com'
  }
})

weatherbitInstance.interceptors.request.use( 
  req => {
  TRACE && console.log(`Request ${req.method.toUpperCase()} to ${req.baseURL}${req.url}`)
  return req
},
  err => {
    TRACE && console.log(`Request error`, err)
    return Promise.reject(err)
  }
)

export default weatherbitInstance