import reducer from './reducer'
import {
    pendingGetListAddress,
    errorGetListAddress,
    errorGetRouter,
    pendingGetRouter,
    successGetListAddress,
    successGetRouter
} from "./actions";

describe('router reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
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
        })
    })

    it(`should action ${pendingGetListAddress.toString()}`, () => {
        expect(
            reducer({}, pendingGetListAddress())
        ).toEqual({
            address: {
                isLoading: true,
            }
        })
    })

    it(`should action ${errorGetListAddress.toString()}`, () => {
        expect(
            reducer({}, errorGetRouter('Ошибка'))
        ).toEqual({
            route: {
                error: 'Ошибка',
                isLoading: false,
            }
        })
    })

    it(`should action ${successGetListAddress.toString()}`, () => {
        expect(
            reducer({}, successGetListAddress({addresses:['1 address', '2 address', '3 address']}))
        ).toEqual({
            address:{
                isLoading: false,
                list: ['1 address', '2 address', '3 address'],
                error: null
            }
        })
    })

    it(`should action ${pendingGetRouter.toString()}`, () => {
        expect(
            reducer({}, pendingGetRouter())
        ).toEqual({
            route: {
                drawRoute: [],
                isLoading: true,
            }
        })
    })

    it(`should action ${successGetRouter.toString()}`, () => {
        expect(
            reducer({}, successGetRouter([1,2,3,4,5,6]))
        ).toEqual({
            route: {
                drawRoute: [1,2,3,4,5,6],
                isLoading: false,
            }
        })
    })

});
