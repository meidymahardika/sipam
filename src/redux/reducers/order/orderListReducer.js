const LOAD_DATA_ORDER           = 'LOAD_DATA_ORDER'
const LOAD_DATA_ORDER_SUCCESS   = 'LOAD_DATA_ORDER_SUCCESS'
const LOAD_DATA_ORDER_FAILED    = 'LOAD_DATA_ORDER_FAILED'
const UNMOUNT_DATA_ORDER        = 'UNMOUNT_DATA_ORDER'

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

const orderReducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_DATA_ORDER:
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
    case LOAD_DATA_ORDER_SUCCESS:
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
    case LOAD_DATA_ORDER_FAILED:
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
    case UNMOUNT_DATA_ORDER:
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

export default orderReducer;