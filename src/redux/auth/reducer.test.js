import reducer from './reducer'
import {logIn, logInError, logOut} from "./actions";

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            isLoggedIn: false,
            error: null,
            token: ''
        })
    })
    it(`should action ${logIn.toString()}`, () => {
        expect(
            reducer({}, logIn({isLoggedIn: true, token: 'test'}))
        ).toEqual({
            isLoggedIn: true,
            token: 'test',
            error: null
        })
    })
    it(`should action ${logIn.toString()}`, () => {
        expect(
            reducer({}, logIn({isLoggedIn: true, token: 'test'}))
        ).toEqual({
            isLoggedIn: true,
            token: 'test',
            error: null
        })
    })

    it(`should action ${logOut.toString()}`, () => {
        expect(
            reducer({isLoggedIn: true, token: 'test'}, logOut())
        ).toEqual({
            isLoggedIn: false,
            token: '',
            error: null
        })
    })

    it(`should action ${logInError.toString()}`, () => {
        expect(
            reducer({}, logInError({error: 'Ошибка'}))
        ).toEqual({
            isLoggedIn: false,
            token: '',
            error: 'Ошибка'
        })
    })

})
