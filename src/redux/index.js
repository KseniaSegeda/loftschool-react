import { combineReducers } from 'redux';
import auth from './auth/reducer';
import pay from './payments/reducer';

export default combineReducers({auth, pay})
