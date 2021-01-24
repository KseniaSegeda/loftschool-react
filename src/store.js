import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import {authSaga, regSaga, entrySaga, logOutSaga} from './redux/auth/saga';
import {cardSaga} from './redux/payments/saga';
import {listAddressSaga, routeSaga} from './redux/route/saga';

const SagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer,
    composeWithDevTools(applyMiddleware(SagaMiddleware)),
);

SagaMiddleware.run(authSaga);
SagaMiddleware.run(regSaga);
SagaMiddleware.run(entrySaga);
SagaMiddleware.run(logOutSaga);
SagaMiddleware.run(cardSaga);
SagaMiddleware.run(listAddressSaga);
SagaMiddleware.run(routeSaga);
