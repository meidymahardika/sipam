import { API } from '../../../config';
import { errorHandler } from '../auth/errorAction';

export const unmountListOrder = () => (dispatch) => {
  return dispatch({type: 'UNMOUNT_DATA_ORDER'})
}

export const unmountDetailOrder = () => (dispatch) => {
  return dispatch({type: 'UNMOUNT_DETAIL_ORDER'})
}

export const createOrder = (value, successCB, failedCB) => () => {
  API.POST('/order', value).then((response) => {
    return successCB && successCB(response)
  }).catch((err) => {
    return failedCB && failedCB(err)
  })
}

export const getQueue = (successCB, failedCB) => async (dispatch) => {
    await dispatch({ type: 'LOAD_QUEUE' })
    API.GET('/order/queue').then((response) => {
      dispatch({
        type: 'LOAD_QUEUE_SUCCESS', 
        payload: { data: response.payload.data }
      })
      return successCB && successCB(response.payload.data)
    }).catch((err) => {
      failedCB && failedCB()
      return dispatch(errorHandler(
        err, 
        dispatch({ type: 'LOAD_QUEUE_FAILED' }), 
      ))
    })
}

export const getNextQueue = (successCB, failedCB) => async (dispatch) => {
  await dispatch({ type: 'LOAD_QUEUE' })
  API.GET('/order/next-queue').then((response) => {
    dispatch({
      type: 'LOAD_QUEUE_SUCCESS', 
      payload: { data: response.payload.data }
    })
    return successCB && successCB(response.payload.data)
  }).catch((err) => {
    failedCB && failedCB()
    return dispatch(errorHandler(
      err, 
      dispatch({ type: 'LOAD_QUEUE_FAILED' }), 
    ))
  })
}

export const listOrder = (meta) => async (dispatch) => {
  await dispatch({ type: 'LOAD_DATA_ORDER' })
  return API.GET('/order/list', meta).then((response) => {
    dispatch({
      type: 'LOAD_DATA_ORDER_SUCCESS', 
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
      dispatch({ type: 'LOAD_DATA_ORDER_FAILED' }), 
    ))
  })
}

export const detailOrder = (id, successCB, failedCB) => async (dispatch) => {
  await dispatch({ type: 'LOAD_DETAIL_ORDER' })
  API.GET(`/order/detail/${id}`).then((response) => {
    dispatch({
      type: 'LOAD_DETAIL_ORDER_SUCCESS', 
      payload: { data: response.payload.data }
    })
    return successCB && successCB(response.payload.data)
  }).catch((err) => {
    failedCB && failedCB()
    return dispatch(errorHandler(
      err, 
      dispatch({ type: 'LOAD_DETAIL_ORDER_FAILED' }), 
    ))
  })
}

export const updateStatusPaid = (id, successCB, failedCB) => () => {
  API.PUT(`/order/update-status-paid/${id}`).then((response) => {
    return successCB && successCB(response)
  }).catch((err) => {
    return failedCB && failedCB(err)
  })
}

export const updateStatusDone = (value, successCB, failedCB) => () => {
  API.POST('/order/update-status-done', value).then((response) => {
    return successCB && successCB(response)
  }).catch((err) => {
    return failedCB && failedCB(err)
  })
}

export const updateStatusReject = (value, successCB, failedCB) => () => {
  API.POST('/order/update-status-reject', value).then((response) => {
    return successCB && successCB(response)
  }).catch((err) => {
    return failedCB && failedCB(err)
  })
}