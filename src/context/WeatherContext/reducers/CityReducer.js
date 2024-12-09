export const cityDefault = {
  loading: false,
  loaded: false,
  loadingError: false,
  data: []
}

export default (state = cityDefault, action) => {
  const {type, payload} = action
  switch (type) {
    case 'CITY_SEARCH_LOAD_INIT':
      
      return {
        ...state,
        loading: true,
        loaded: false,
        loadingError: false,
        data: []
      }

    case 'CITY_SEARCH_LOAD_SUCCESS':
      
      return {
        ...state,
        loading: false,
        loaded: true,
        loadingError: false,
        data: payload
      }

    case 'CITY_SEARCH_LOAD_FAILED':
      
      return {
        ...state,
        loading: false,
        loaded: false,
        loadingError: true,
      }
    
    case 'CITY_RESET_STATE':

      return cityDefault
  
    default:
      return state
  }

}