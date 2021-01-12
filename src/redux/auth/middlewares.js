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
                console.log(responseLogIn)
                store.dispatch(logInError(responseLogIn))
            }
            next(action);
            break;
        case registration.toString():
            const responseLogUp = await serverLogUp(action.payload)
            if (responseLogUp.success) {
                store.dispatch(logIn(responseLogUp))
            } else {
                console.log(responseLogUp)
                store.dispatch(logInError(responseLogUp));
            }
            break;
        case logIn.toString():
            window.localStorage.setItem('state', JSON.stringify({
                isLoggedIn: true,
                token: action.payload.token
            }));
            break;
        case logOut.toString():
            window.localStorage.removeItem('state');
            break;
        default:
            next(action);
            break;
    }
}
