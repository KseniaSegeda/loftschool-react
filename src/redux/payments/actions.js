import { createAction } from 'redux-actions';

export const pendingSetCard = createAction('PENDING_SET_CARD');
export const successSetCard = createAction('SUCCESS_SET_CARD');


export const pendingGetCard = createAction('PENDING_GET_CARD');
export const successGetCard = createAction('SUCCESS_GET_CARD');

export const errorCard = createAction('ERROR_CARD');
