const LOAD_DATA_INDEX_PRODUCT           = 'LOAD_DATA_INDEX_PRODUCT'
const LOAD_DATA_INDEX_PRODUCT_SUCCESS   = 'LOAD_DATA_INDEX_PRODUCT_SUCCESS'
const LOAD_DATA_INDEX_PRODUCT_FAILED    = 'LOAD_DATA_INDEX_PRODUCT_FAILED'
const UNMOUNT_DATA_INDEX_PRODUCT        = 'UNMOUNT_DATA_INDEX_PRODUCT'

const initialState = {
  loading: true,
  data: null,
  message: null,
}

const indexProductReducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_DATA_INDEX_PRODUCT:
      return {
        ...state,
        loading: true,
        data: null,
      }
    case LOAD_DATA_INDEX_PRODUCT_SUCCESS:
      return { 
        ...state, 
        loading: false,
        data: action.payload.data,
        message: 'SUCCESS',
      }
    case LOAD_DATA_INDEX_PRODUCT_FAILED:
      return { 
        ...state, 
        loading: true,
        data: null,
        message: 'FAILED',
      }
    case UNMOUNT_DATA_INDEX_PRODUCT:
      return { 
        ...state, 
        loading: true,
        data: null,
      }
    default:
      return state
  }
}

export default indexProductReducer;