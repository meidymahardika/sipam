import { combineReducers } from 'redux';
import authReducer from './auth/authReducer'
import categoryProductReducer from './categoryProduct/categoryProductReducer'
import productReducer from './product/productReducer'

export default combineReducers({
    authReducer,
    categoryProduct: combineReducers({
        list: categoryProductReducer
    }),
    productReducer
})