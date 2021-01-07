import  {logIn, logOut, logInError} from './actions'
const initialState = {
    isLoggedIn: window.localStorage.getItem('state')
        ? JSON.parse(window.localStorage.getItem('state')).isLoggedIn
        : false,
    token: window.localStorage.getItem('state')
        ? JSON.parse(window.localStorage.getItem('state')).token
        : ''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state=initialState, action) {
    switch(action.type){
        case logIn.toString(): {
            window.localStorage.setItem('state', JSON.stringify({
                isLoggedIn: true,
                token: action.payload
            }));
            return {
                error: '',
                isLoggedIn: true,
                token: action.payload
            }
        }
        case logOut.toString(): {
            window.localStorage.removeItem('state');
            return {
                isLoggedIn: false,
                token: '',
                error: ''
            }
        }
        case logInError.toString(): {
            return {isLoggedIn: false, error: action.payload.error, token: ''}
        }
        default:
            return state;
    }
}
