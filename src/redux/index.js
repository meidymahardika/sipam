import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import AllReducer from './reducers';

const initialState = {}
const store = createStore(AllReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store;