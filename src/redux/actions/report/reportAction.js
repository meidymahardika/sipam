import { API } from '../../../config';
import { errorHandler } from '../auth/errorAction';

export const unmountListReport = () => (dispatch) => {
  return dispatch({type: 'UNMOUNT_DATA_REPORT'})
}

export const listReport = (meta) => async (dispatch) => {
  await dispatch({ type: 'LOAD_DATA_REPORT' })
  return API.GET('/report/list', meta).then((response) => {
    dispatch({
      type: 'LOAD_DATA_REPORT_SUCCESS', 
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
      dispatch({ type: 'LOAD_DATA_REPORT_FAILED' }), 
    ))
  })
}