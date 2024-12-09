export const cityDefault = {
  loading: false,
  loaded: false,
  loadingError: false,
  data: [],
  saveFavoriteSuccess: false,
  saveFavoriteError: false,
  favError: ''
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
    case 'CITY_NEW_FAVORITE_INIT':
      return {
        ...state,
        saveFavoriteSuccess: false,
        saveFavoriteError: false
      }
    
    case 'CITY_NEW_FAVORITE_SUCCESS':
      return {
        ...state,
        saveFavoriteSuccess: true,
        saveFavoriteError: false
      }

    case 'CITY_NEW_FAVORITE_ERROR':
      return {
        ...state,
        saveFavoriteSuccess: false,
        saveFavoriteError: true,
        favError: payload
      }
    
    case 'CITY_RESET_STATE':

      return cityDefault
  
    default:
      return state
  }

}