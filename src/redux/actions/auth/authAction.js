import app from '../../../config/firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Cookies from 'js-cookie';

export const checkAuth = () => async (dispatch) => {
  await dispatch({ type: 'LOAD_AUTH' })
  const getToken = Cookies.get('accessToken')
  if(getToken) {
    if(getToken !== null) {
      return dispatch({ type: 'LOAD_AUTH_SUCCESS' })
    }
  }else {
    return dispatch({ type: 'LOAD_AUTH_FAILED' })
  }
}

export const setLogin = (value, successCB, failedCB) => async dispatch => {
  await dispatch({ type: 'LOAD_AUTH' })
  const auth = getAuth(app);
  signInWithEmailAndPassword(auth, value.email, value.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      Cookies.set('uid', user.uid)
      Cookies.set('accessToken', user.stsTokenManager.accessToken)
      Cookies.set('refreshToken',  user.stsTokenManager.refreshToken)
      dispatch({ type: 'LOAD_AUTH_SUCCESS' })
      return successCB && successCB(userCredential)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      dispatch({ type: 'LOAD_AUTH_FAILED' })
      return failedCB && failedCB(errorCode)
    });
}

export const setLogout = (successCB, failedCB) => async dispatch => {
  return dispatch(removedata(() => {
    dispatch({ type: 'SET_LOGOUT_SUCCESS'})
    return successCB && successCB();
  }))
}

export const removedata = (cb) => async (dispatch) => {
  await Cookies.remove('uid')
  await Cookies.remove('accessToken')
  await Cookies.remove('refreshToken')
  return cb()
}