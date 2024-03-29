import { combineReducers } from 'redux';
import authReducer from './auth/authReducer'
import categoryProductReducer from './categoryProduct/categoryProductReducer'
import masterCategoryProductReducer from './categoryProduct/masterCategoryProductReducer'
import productListReducer from './product/productListReducer'
import productReducer from './product/productReducer'
import queueReducer from './order/queueReducer';
import orderListReducer from './order/orderListReducer';
import orderDetailReducer from './order/orderDetailReducer';
import reportListReducer from './report/reportListReducer';

export default combineReducers({
    authReducer,
    categoryProduct: combineReducers({
        list: categoryProductReducer,
        master: masterCategoryProductReducer
    }),
    productReducer: combineReducers({
        list: productListReducer,
        index: productReducer
    }),
    orderReducer: combineReducers({
        queue: queueReducer,
        list: orderListReducer,
        detail: orderDetailReducer
    }),
    reportReducer: combineReducers({
        list: reportListReducer
    }),
})