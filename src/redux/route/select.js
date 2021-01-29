import {createSelector} from 'reselect'

export const getRoute = createSelector(
    [
        state => state.route.address.list,
        state => state.route.route,
        state => state.pay.cardNumber
    ],
    (listAddress, route, cardName) => ({
        addresses: listAddress,
        draw: route,
        isCard: Boolean(cardName)
    })
)
