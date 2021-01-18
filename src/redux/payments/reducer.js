
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
                isLoading: true,
                error: action.payload
            }
        default:
            return state;
    }
}

export const getCard = (state) => {
    const {
        cardNumber,
        expiryDate,
        cardName,
        cvc,
        isLoading
    } = state.pay;
    return {
        cardNumber,
        expiryDate,
        cardName,
        cvc,
        isLoading
    };
}
