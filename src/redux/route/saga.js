import {call, put, takeEvery} from "redux-saga/effects";
import {serverGetAddress, serverGetRoute} from "../../api/address";
import {
    errorGetListAddress,
    errorGetRouter,
    pendingGetListAddress, pendingGetRouter,
    successGetListAddress,
    successGetRouter
} from "./actions";


export function* getAddressSaga() {
    try {
        const responseListAddress = yield call(serverGetAddress);
        if (responseListAddress['addresses']) {
            yield put(successGetListAddress(responseListAddress));
        }
    } catch (e) {
        yield put(errorGetListAddress('Сетевая ошибка'))
        console.error('getAddressSaga', e);
    }
}

export function* getRouteSaga(action) {
    try {
        const {fromRoute, toRoute} =  action.payload;
        const responseRoute = yield call(serverGetRoute, fromRoute, toRoute);
        if (responseRoute) {
            yield put(successGetRouter(responseRoute));
        }
    } catch (e) {
        yield put(errorGetRouter('Сетевая ошибка'))
        console.error('getRouteSaga', e);
    }
}

export function* routeSaga() {
    yield takeEvery(pendingGetRouter, getRouteSaga);
}

export function* listAddressSaga() {
    yield takeEvery(pendingGetListAddress, getAddressSaga);
}
