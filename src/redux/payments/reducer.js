
import {successSetCard, errorCard, pendingGetCard} from "./actions";
const initialState = {
    cardNumber: '',
    expiryDate: '',
    cardName: '',
    cvc:'',
    isLoading: false
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch(action.type){
        case pendingGetCard.toString():
            return {
                cardNumber: '',
                cardName: '',
                cvc:'',
                error: null,
                isLoading: false
            }
        case successSetCard.toString():
            const {cardNumber, expiryDate, cardName, cvc} = action.payload;
            return {
                cardNumber,
                expiryDate,
                cardName,
                cvc,
                isLoading: true
            }
        case errorCard.toString():
            return {
                cardNumber: '',
                cardName: '',
                cvc:'',
                isLoading: true,
                error: action.payload
            }
        default:
            return state;
    }
}
