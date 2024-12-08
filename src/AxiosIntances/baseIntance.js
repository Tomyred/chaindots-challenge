import axios from "axios";

const TRACE = true

const baseInstance = axios.create({
  baseURL: 'https://weatherapi-com.p.rapidapi.com/',
  timeout: 2000,
  headers: {
    'x-rapidapi-key': '655e7584fbmsh272ff5cfa73554cp1224e9jsn5a2cb98937f4', //todo: move to env variables+
    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
  }
})

baseInstance.interceptors.request.use( 
  req => {
  TRACE && console.log(`Request ${req.method.toUpperCase()} to ${req.baseURL}${req.url}`)
  return req
},
  err => {
    TRACE && console.log(`Request error`, err)
    return Promise.reject(err)
  }
)

export default baseInstance