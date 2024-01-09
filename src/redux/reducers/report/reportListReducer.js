const LOAD_DATA_REPORT           = 'LOAD_DATA_REPORT'
const LOAD_DATA_REPORT_SUCCESS   = 'LOAD_DATA_REPORT_SUCCESS'
const LOAD_DATA_REPORT_FAILED    = 'LOAD_DATA_REPORT_FAILED'
const UNMOUNT_DATA_REPORT        = 'UNMOUNT_DATA_REPORT'

const initialState = {
  loading: true,
  data: null,
  message: null,
  pagination: {
    page: 1,
    total: 0,
    perpage: 10
  }
}

const reportReducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_DATA_REPORT:
      return {
        ...state,
        loading: true,
        data: null,
        pagination: {
          page: 1,
          total: 0,
          perpage: 10
        }
      }
    case LOAD_DATA_REPORT_SUCCESS:
      return { 
        ...state, 
        loading: false,
        data: action.payload.data,
        message: 'SUCCESS',
        pagination: {
          total: action.payload.pagination.total,
          page: action.payload.pagination.page,
          perpage: action.payload.pagination.perpage
        }
      }
    case LOAD_DATA_REPORT_FAILED:
      return { 
        ...state, 
        loading: true,
        data: null,
        message: 'FAILED',
        pagination: {
          page: 1,
          total: 0,
          perpage: 10
        }
      }
    case UNMOUNT_DATA_REPORT:
      return { 
        ...state, 
        loading: true,
        data: null,
        pagination: {
          page: 1,
          total: 0,
          perpage: 10
        }
      }
    default:
      return state
  }
}

export default reportReducer;