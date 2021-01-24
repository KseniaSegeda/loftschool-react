import { createAction } from 'redux-actions';

export const pendingGetListAddress = createAction('PENDING_GET_LIST_ADDRESS');
export const successGetListAddress = createAction('SUCCESS_GET_LIST_ADDRESS');
export const errorGetListAddress = createAction('ERROR_GET_LIST_ADDRESS');

export const pendingGetRouter = createAction('PENDING_GET_ROUTER');
export const successGetRouter = createAction('SUCCESS_GET_ROUTER');
export const resetRouter = createAction('RESET_ROUTER');
export const errorGetRouter = createAction('ERROR_GET_ROUTER');




