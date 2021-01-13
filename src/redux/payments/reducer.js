
import {successSetCard, errorCard} from "./actions";
const initialState = {
    cardNumber: '',
    expiryDate: '',
    cardName: '',
    cvc:''
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action) {
    switch(action.type){
        case successSetCard.toString():
            const {cardNumber, expiryDate, cardName, cvc} = action.payload;
            return {
                cardNumber,
                expiryDate,
                cardName,
                cvc,
            }
        case errorCard.toString():
            return {
                error: action.payload
            }
        default:
            return state;
    }
}
