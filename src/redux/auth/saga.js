import { takeEvery, call, put } from 'redux-saga/effects';
import { serverLogIn } from '../../api/auth';
import { serverLogUp } from '../../api/regstraton';
import {authenticate, logIn, logInError, registration, logOut} from './index';

export function* authenticateSaga(action) {
    const {email, password} = action.payload;
    const responseLogIn = yield call(serverLogIn, email, password);
    try {
        if (responseLogIn['success']) {
            yield put(logIn(responseLogIn));
        } else{
            yield put(logInError(responseLogIn.error))
        }
    } catch (e) {
        yield put(logInError('Сетевая ошибка', responseLogIn))
        console.error('authenticateSaga', e);
    }
}

export function* registrationSaga(action) {
    const form = action.payload;
    try {
        const responseRegistration = yield call(serverLogUp, form);
        if (responseRegistration['success']) {
            yield put(logIn(responseRegistration));
        } else{
            yield put(logInError(responseRegistration.error))
        }
    } catch (e) {
        yield put(logInError('Сетевая ошибка'))
        console.error('authenticateSaga', e);
    }
}

export function* exitSaga() {
    yield localStorage.removeItem("state");
}

export function* logInSaga(action) {
    yield localStorage.setItem('state', JSON.stringify({
        isLoggedIn: true,
        token: action.payload.token
    }));
}



export function* entrySaga() {
    yield takeEvery(logIn, logInSaga);
}

export function* logOutSaga() {
    yield takeEvery(logOut, exitSaga);
}

export function* regSaga() {
    yield takeEvery(registration, registrationSaga);
}

export function* authSaga() {
    yield takeEvery(authenticate, authenticateSaga);
}
