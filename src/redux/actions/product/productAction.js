import { API } from '../../../config'
import { errorHandler } from '../auth/errorAction'

export const unmountIndexProduct = () => (dispatch) => {
  return dispatch({type: 'UNMOUNT_DATA_INDEX_PRODUCT'})
}

export const unmountListProduct = () => (dispatch) => {
  return dispatch({type: 'UNMOUNT_DATA_PRODUCT'})
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

export const listProduct = (meta) => async (dispatch) => {
  await dispatch({ type: 'LOAD_DATA_PRODUCT' })
  return API.GET('/product/list', meta).then((response) => {
    dispatch({
      type: 'LOAD_DATA_PRODUCT_SUCCESS', 
      payload: {
        data: response.payload.data,
        pagination: {
          page: response.payload.meta.page,
          total: response.payload.meta.total,
          perpage: response.payload.meta.perpage
        }
    }})
  }).catch((err) => {
    return dispatch(errorHandler(
      err, 
      dispatch({ type: 'LOAD_DATA_PRODUCT_FAILED' }), 
    ))
  })
}

export const createProduct = (value, successCB, failedCB) => () => {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    for (const [name, val] of Object.entries(value)) {
      data.append(name, val)
    }
    API.POST_FORM_DATA('/product', data).then((response) => {
      return successCB && successCB(response)
    }).catch((err) => {
      return failedCB && failedCB(err)
    })
  })
}