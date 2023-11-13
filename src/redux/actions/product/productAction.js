import { API } from '../../../config'
import { errorHandler } from '../auth/errorAction'

export const unmountIndexProduct = () => (dispatch) => {
  return dispatch({type: 'UNMOUNT_DATA_INDEX_PRODUCT'})
}

export const indexProduct = () => async (dispatch) => {
  await dispatch({ type: 'LOAD_DATA_INDEX_PRODUCT' })
  API.GET('/product').then((response) => {
    dispatch({
      type: 'LOAD_DATA_INDEX_PRODUCT_SUCCESS', 
      payload: {
        data: response.payload.data
    }})
  }).catch((err) => {
    return dispatch(errorHandler(
      err.error || err.message, 
      dispatch({ type: 'LOAD_DATA_INDEX_PRODUCT_FAILED' }), 
    ))
  })
}