export const forecastDefault = {
  loading: false,
  loaded: false,
  loadingError: false,
  data: {}
}

export default (state = forecastDefault, action) => {
  const {type, payload} = action
  switch (type) {
    case 'FORECAST_LOAD_INIT':
      
      return {
        ...state,
        loading: true,
        loaded: false,
        loadingError: false,
        data: {}
      }

    case 'FORECAST_LOAD_SUCCESS':
      
      return {
        ...state,
        loading: false,
        loaded: true,
        loadingError: false,
        data: payload
      }

    case 'FORECAST_LOAD_FAILED':
      
      return {
        ...state,
        loading: false,
        loaded: false,
        loadingError: true,
      }
    
    case 'FORECAST_RESET_STATE':

      return forecastDefault
  
    default:
      return state
  }

}