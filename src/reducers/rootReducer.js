import { combineReducers } from 'redux';
import authReducer from './authReducer'; // assuming you have an authReducer

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;