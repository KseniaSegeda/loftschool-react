import {authenticate, logIn, logInError, logOut, registration} from "./actions";
import {serverLogIn} from '../../api/auth'
import {serverLogUp} from "../../api/regstraton";

export const authMiddleware = (store) => (next) => async (action) => {
    switch (action.type) {
        case authenticate.toString():
            const {email, password} = action.payload;
            const responseLogIn = await serverLogIn(email, password)
            if (responseLogIn.success) {
                store.dispatch(logIn(responseLogIn))
            } else {
                store.dispatch(logInError(responseLogIn))
            }
            next(action);
            break;
        case registration.toString():
            const responseLogUp = await serverLogUp(action.payload)
            if (responseLogUp.success) {
                store.dispatch(logIn(responseLogUp))
            } else {
                store.dispatch(logInError(responseLogUp));
            }
            next(action);
            break;
        case logIn.toString():
            window.localStorage.setItem('state', JSON.stringify({
                isLoggedIn: true,
                token: action.payload.token
            }));
            next(action);
            break;
        case logOut.toString():
            window.localStorage.removeItem('state');
            next(action);
            break;
        default:
            next(action);
            break;
    }
}
