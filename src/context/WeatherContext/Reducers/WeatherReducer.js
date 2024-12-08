export const weatherDefault = {
  loading: false,
  loaded: false,
  loadingError: false,
  data: []
}

export default (state = weatherDefault, action) => {
  const {type, payload} = action

  switch (type) {
    case 'LOAD_INIT':
      
      return state
  
    default:
      return state
  }

}