import reducer from './reducer'
import {errorCard, successSetCard} from "./actions";

const FAKE_DATA_CARD = {
    cardNumber: '0000 0000 0000 000',
    expiryDate: '11/22',
    cardName: 'Test Card',
    cvc: '111'
}

describe('payments reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            cardNumber: '',
            expiryDate: '',
            cardName: '',
            cvc: '',
            isLoading: false,
        })
    })
    it(`should action ${successSetCard.toString()}`, () => {
        expect(
            reducer({}, successSetCard(FAKE_DATA_CARD))
        ).toEqual({...FAKE_DATA_CARD, isLoading: true})
    })
    it(`should action ${errorCard.toString()}`, () => {
        expect(
            reducer({}, errorCard('Ошибка'))
        ).toEqual({
            cardName: "",
            cardNumber: "",
            cvc: "",
            error: "Ошибка",
            isLoading: true
        })
    })
})
