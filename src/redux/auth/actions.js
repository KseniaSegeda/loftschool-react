import { createAction } from 'redux-actions';

export const logIn = createAction('LOG_IN');
export const checkLogin = createAction('CHECK_LOGIN');
export const logOut = createAction('LOG_OUT');
export const authenticate = createAction('AUTHENTICATE');
export const registration = createAction('REGISTRATION');
export const logInError = createAction('LOG_IN_ERROR');
