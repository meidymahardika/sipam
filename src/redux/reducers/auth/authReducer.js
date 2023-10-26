const LOAD_AUTH             = 'LOAD_AUTH'
const LOAD_AUTH_SUCCESS     = 'LOAD_AUTH_SUCCESS'
const LOAD_AUTH_FAILED      = 'LOAD_AUTH_FAILED'
const SET_LOGOUT            = 'SET_LOGOUT'
const SET_LOGOUT_SUCCESS    = 'SET_LOGOUT_SUCCESS'
const SET_LOGOUT_FAILED     = 'SET_LOGOUT_FAILED'

const initialState = {
  loading: true,
  authed: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type){
    case LOAD_AUTH:
      return{ 
        ...state, 
        loading: true
      }
    case LOAD_AUTH_SUCCESS:
      return{ 
        ...state, 
        loading: false,
        authed: true,
      }
    case LOAD_AUTH_FAILED:
      return{ 
        ...state, 
        loading: false,
        authed: false,
      }
      case SET_LOGOUT:
        return {
          ...state,
          loading: true,
        };
       case SET_LOGOUT_SUCCESS:
        return {
          ...state,
          loading: false,
          authed: false,
        };
       case SET_LOGOUT_FAILED:
        return {
          ...state,
          loading: false,
        };
    default:
      return state
  }
}
export default authReducer;