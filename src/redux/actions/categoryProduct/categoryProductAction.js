import { API } from '../../../config';
import { errorHandler } from '../auth/errorAction';

export const unmountListCategoryProduct = () => (dispatch) => {
  return dispatch({type: 'UNMOUNT_DATA_CATEGORY_PRODUCT'})
}

export const unmountDetailCategoryProduct = () => (dispatch) => {
  return dispatch({type: 'UNMOUNT_DETAIL_CATEGORY_PRODUCT'})
}

export const unmountMasterCategoryProduct = () => (dispatch) => {
  return dispatch({type: 'UNMOUNT_DATA_MASTER_CATEGORY_PRODUCT'})
}

export const listCategoryProduct = (meta) => async (dispatch) => {
  await dispatch({ type: 'LOAD_DATA_CATEGORY_PRODUCT' })
  return API.GET('/category-product/list', meta).then((response) => {
    dispatch({
      type: 'LOAD_DATA_CATEGORY_PRODUCT_SUCCESS', 
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
      dispatch({ type: 'LOAD_DATA_CATEGORY_PRODUCT_FAILED' }), 
    ))
  })
}

export const createCategoryProduct = (value, successCB, failedCB) => () => {
  API.POST('/category-product', value).then((response) => {
    return successCB && successCB(response)
  }).catch((err) => {
    return failedCB && failedCB(err)
  })
}

export const deleteCategoryProduct = (id, successCB, failedCB) => () => {
  API.DELETE(`/category-product/${id}`).then((response) => {
    return successCB && successCB(response)
  }).catch((err) => {
    return failedCB && failedCB(err)
  })
}


export const updateCategoryProduct = (id, value, successCB, failedCB) => () => {
  API.PUT(`/category-product/${id}`, value).then((response) => {
    return successCB && successCB(response)
  }).catch((err) => {
    return failedCB && failedCB(err)
  })
}