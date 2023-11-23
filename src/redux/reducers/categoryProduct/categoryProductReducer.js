const LOAD_DATA_CATEGORY_PRODUCT           = 'LOAD_DATA_CATEGORY_PRODUCT'
const LOAD_DATA_CATEGORY_PRODUCT_SUCCESS   = 'LOAD_DATA_CATEGORY_PRODUCT_SUCCESS'
const LOAD_DATA_CATEGORY_PRODUCT_FAILED    = 'LOAD_DATA_CATEGORY_PRODUCT_FAILED'
const UNMOUNT_DATA_CATEGORY_PRODUCT        = 'UNMOUNT_DATA_CATEGORY_PRODUCT'

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

const categoryProductReducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_DATA_CATEGORY_PRODUCT:
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
    case LOAD_DATA_CATEGORY_PRODUCT_SUCCESS:
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
    case LOAD_DATA_CATEGORY_PRODUCT_FAILED:
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
    case UNMOUNT_DATA_CATEGORY_PRODUCT:
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

export default categoryProductReducer;