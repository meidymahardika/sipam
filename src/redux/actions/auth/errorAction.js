import { removedata } from './authAction';

export const errorHandler = (status, cb) => async dispatch => {
  if(status){
    switch (status.message) {
      case "Client id must be present in response from auth server":
        await dispatch({type: 'SET_LOGOUT'});
        return dispatch(removedata(() => {
          return dispatch({type: 'SET_LOGOUT_SUCCESS'});
        }))
      case "No message available":
        await dispatch({type: 'SET_LOGOUT'});
        return dispatch(removedata(() => {
          return dispatch({type: 'SET_LOGOUT_SUCCESS'});
        }))
      case "Error":
      case "UNAUTHORIZED":
        return null     
      case "FAILED":
        return null  
      default:
        return cb
    }
  }else{
    await dispatch({type: 'SET_LOGOUT'});
    return dispatch(removedata(() => {
      return dispatch({type: 'SET_LOGOUT_SUCCESS'});
    }))
  }
}