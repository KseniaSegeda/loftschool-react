import  {logIn, logOut, logInError, checkLogin} from './actions'
const initialState = {
    isLoggedIn: false,
    token: '',
    error: null
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state= initialState, action) {
    switch(action.type){
        case logIn.toString(): {

            return {
                error: null,
                isLoggedIn: true,
                token: action.payload.token
            }
        }
        case checkLogin.toString(): {

            return {
                error: null,
                isLoggedIn: action.payload.isLoggedIn,
                token: action.payload.token
            }
        }
        case logOut.toString(): {
            return {
                isLoggedIn: false,
                token: '',
                error: null
            }
        }
        case logInError.toString(): {
            return {isLoggedIn: false, error: action.payload, token: ''}
        }
        default:
            return state;
    }
}

export const getAuth = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
    error: state.auth.error
})

