const LOAD_DETAIL_ORDER           = 'LOAD_DETAIL_ORDER'
const LOAD_DETAIL_ORDER_SUCCESS   = 'LOAD_DETAIL_ORDER_SUCCESS'
const LOAD_DETAIL_ORDER_FAILED    = 'LOAD_DETAIL_ORDER_FAILED'
const UNMOUNT_DETAIL_ORDER        = 'UNMOUNT_DETAIL_ORDER'

const initialState = {
  loading: true,
  data: null,
  message: null,
}

const detailOrderReducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_DETAIL_ORDER:
      return {
        ...state,
        loading: true,
        data: null,
      }
    case LOAD_DETAIL_ORDER_SUCCESS:
      return { 
        ...state, 
        loading: false,
        data: action.payload.data,
        message: 'SUCCESS',
      }
    case LOAD_DETAIL_ORDER_FAILED:
      return { 
        ...state, 
        loading: true,
        data: null,
        message: 'FAILED',
      }
    case UNMOUNT_DETAIL_ORDER:
      return { 
        ...state, 
        loading: true,
        data: null,
      }
    default:
      return state
  }
}

export default detailOrderReducer;