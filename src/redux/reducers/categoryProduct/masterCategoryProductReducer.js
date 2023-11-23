const LOAD_DATA_MASTER_CATEGORY_PRODUCT           = 'LOAD_DATA_MASTER_CATEGORY_PRODUCT'
const LOAD_DATA_MASTER_CATEGORY_PRODUCT_SUCCESS   = 'LOAD_DATA_MASTER_CATEGORY_PRODUCT_SUCCESS'
const LOAD_DATA_MASTER_CATEGORY_PRODUCT_FAILED    = 'LOAD_DATA_MASTER_CATEGORY_PRODUCT_FAILED'
const UNMOUNT_DATA_MASTER_CATEGORY_PRODUCT        = 'UNMOUNT_DATA_MASTER_CATEGORY_PRODUCT'

const initialState = {
  loading: true,
  data: null,
  message: null,
}

const masterCategoryProductReducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_DATA_MASTER_CATEGORY_PRODUCT:
      return {
        ...state,
        loading: true,
        data: null,
      }
    case LOAD_DATA_MASTER_CATEGORY_PRODUCT_SUCCESS:
      return { 
        ...state, 
        loading: false,
        data: action.payload.data,
        message: 'SUCCESS',
      }
    case LOAD_DATA_MASTER_CATEGORY_PRODUCT_FAILED:
      return { 
        ...state, 
        loading: true,
        data: null,
        message: 'FAILED',
      }
    case UNMOUNT_DATA_MASTER_CATEGORY_PRODUCT:
      return { 
        ...state, 
        loading: true,
        data: null,
      }
    default:
      return state
  }
}

export default masterCategoryProductReducer;