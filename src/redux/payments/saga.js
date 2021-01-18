import { takeEvery, call, put } from 'redux-saga/effects';
import {serverSetCard, serverGetCard} from '../../api/card'
import {errorCard, pendingSetCard, successSetCard, pendingGetCard} from "./actions";

export function* setCardSaga(action) {
    const stateLocalStorage = yield localStorage.getItem("state");
    const token = JSON.parse(stateLocalStorage).token;
    const form = Object.assign(action.payload, {token})
    const responseSetCard = yield call(serverSetCard, form);

    if (responseSetCard.success) {
        yield put(successSetCard(action.payload));
    } else {
        yield put(errorCard(responseSetCard.error));
    }
}

export function* getCardSaga(action) {
    const stateLocalStorage = yield localStorage.getItem("state");
    const token = JSON.parse(stateLocalStorage).token;

    const responseGetCard = yield call(serverGetCard, token);

    if (responseGetCard.cardNumber) {
        yield put(successSetCard(responseGetCard));
    } else {
        yield put(errorCard(responseGetCard.error));
    }
}

export function* cardSaga() {
    yield takeEvery(pendingSetCard, setCardSaga);
    yield takeEvery(pendingGetCard, getCardSaga);
}
