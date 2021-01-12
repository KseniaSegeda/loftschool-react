import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { fireEvent, act} from '@testing-library/react'
import renderer from "react-test-renderer";
import {createStore} from "redux";
import rootReducer from "./redux";
import {logIn} from "./redux/auth/actions";

describe('app.js', () => {
    let store;
    beforeAll(() => {
        store = createStore(rootReducer);
    })

    it("renders without crashing", async () => {
        const div = document.createElement("div");
        await act(async () => {
            ReactDOM.render(global.wrapperProvider(<App/>, store), div);
        });
        ReactDOM.unmountComponentAtNode(div);

    });

    it('render correctly', function () {
        const tree = renderer.create(global.wrapperProvider(<App />, store)).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('starting app.js login page', function(){
        const { getByTestId } = global.renderWithProviders(<App />, store);
        expect(getByTestId('login')).toBeInTheDocument();
    });

    it('click link -> change registration/login', async function(){
        let  getByTestId;
        await act(async () => {
            getByTestId = global.renderWithProviders(<App/>, store).getByTestId;
        });
        fireEvent.click(getByTestId('linkRegistration'))
        expect(getByTestId('registration')).toBeInTheDocument();
        fireEvent.click(getByTestId('linkLogin'))
        expect(getByTestId('login')).toBeInTheDocument();
    });


    it('login  -> change page on map', async function(){
        let  getByTestId;
        await act(async () => {
            getByTestId = global.renderWithProviders(<App/>, store).getByTestId;
        });
        store.dispatch(logIn({token: 'test', success: true}))
        expect(getByTestId('map')).toBeInTheDocument();
    });

    it('click profile button in navigation -> change page on profile', async function(){
        let  component;
        await act(async () => {
            component = global.renderWithProviders(<App/>, store);
        });
        let { getByText,getByTestId } = component;
        store.dispatch(logIn({token: 'test', success: true}))
        fireEvent.click(getByText('Профиль'))
        expect(getByTestId('profile')).toBeInTheDocument();
    });
})

