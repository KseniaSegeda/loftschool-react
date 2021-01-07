import { authenticate, logIn, logInError } from "./actions";
import {serverLogIn} from '../../api/auth'

export const authMiddleware = (store) => (next) => async (action) => {
    if (action.type === authenticate.toString()) {
        const {email, password} = action.payload;
        const response = await serverLogIn(email, password)
        if(response.success){
            store.dispatch(logIn(response))
        }else{
            console.log(response)
            store.dispatch(logInError(response))
        }
    } else {
        next(action);
    }
};
