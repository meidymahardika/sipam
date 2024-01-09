const LOAD_QUEUE           = 'LOAD_QUEUE'
const LOAD_QUEUE_SUCCESS   = 'LOAD_QUEUE_SUCCESS'
const LOAD_QUEUE_FAILED    = 'LOAD_QUEUE_FAILED'
const UNMOUNT_QUEUE        = 'UNMOUNT_QUEUE'

const initialState = {
  loading: true,
  data: null,
  message: null,
}

const queueReducer = (state = initialState, action) => {
  switch(action.type){
    case LOAD_QUEUE:
      return {
        ...state,
        loading: true,
        data: null,
      }
    case LOAD_QUEUE_SUCCESS:
      return { 
        ...state, 
        loading: false,
        data: action.payload.data,
        message: 'SUCCESS',
      }
    case LOAD_QUEUE_FAILED:
      return { 
        ...state, 
        loading: true,
        data: null,
        message: 'FAILED',
      }
    case UNMOUNT_QUEUE:
      return { 
        ...state, 
        loading: true,
        data: null,
      }
    default:
      return state
  }
}

export default queueReducer;