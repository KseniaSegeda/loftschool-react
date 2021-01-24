import { createSelector } from 'reselect'

export const getCard = createSelector(
    state => state.pay,
    pay => {
        const {
            cardNumber,
            expiryDate,
            cardName,
            cvc,
            isLoading
        } = pay;
        return {
            cardNumber,
            expiryDate,
            cardName,
            cvc,
            isLoading
        }
    }
)
