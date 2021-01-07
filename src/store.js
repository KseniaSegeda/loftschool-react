import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/index';
import { authMiddleware } from './redux/auth/middlewares';
import { composeWithDevTools } from 'redux-devtools-extension';

export const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(authMiddleware))
);
