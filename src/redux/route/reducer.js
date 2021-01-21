
import {
    pendingGetListAddress,
    successGetListAddress,
    errorGetListAddress,
    pendingGetRouter,
    successGetRouter,
    errorGetRouter,
    resetRouter
} from "./actions";

const initialState = {
    address: {
        isLoading: false,
        list: [],
        error: null
    },
    route: {
        isLoading: false,
        drawRoute: [],
        error: null
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch(action.type){
        case pendingGetListAddress.toString():
            return {
                ...state,
                address: {
                    isLoading: true,
                }
            }
        case successGetListAddress.toString():
            return {
                ...state,
                address:{
                    isLoading: false,
                    list: action.payload.addresses,
                    error: null
                }
            }
        case errorGetListAddress.toString():
            return {
                ...state,
                address: {
                    error: action.payload
                }
            }
        case pendingGetRouter.toString():
            return {
                ...state,
                route: {
                    drawRoute: [],
                    isLoading: true,
                }
            }
        case successGetRouter.toString():
            return {
                ...state,
                route: {
                    isLoading: false,
                    drawRoute: action.payload
                }
            }

        case resetRouter.toString():
            return {
                ...state,
                route: {
                    isLoading: false,
                    drawRoute: [],
                    error: null
                }
            }
        case errorGetRouter.toString():
            return {
                ...state,
                route: {
                    isLoading: false,
                    error: action.payload
                }
            }
        default:
            return state;
    }
}
