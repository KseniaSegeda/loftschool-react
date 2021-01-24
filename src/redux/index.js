import { combineReducers } from 'redux';
import auth from './auth/reducer';
import pay from './payments/reducer';
import route from './route/reducer'

export default combineReducers({auth, pay, route})
