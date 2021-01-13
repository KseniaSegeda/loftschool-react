import ReactDOM from "react-dom";
import Login from "../Login/Login";
import renderer from "react-test-renderer";
import React from "react";
import { createStore } from 'redux'
import rootReducer from './../../redux/index'

describe('login.js', () => {
    let store;
    beforeAll(() => {
        store = createStore(rootReducer);
    })

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(global.wrapperProvider(<Login />, store), div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("renders correctly with testId", () => {
        const { getByTestId } = global.renderWithProviders(<Login />, store)
        expect(getByTestId("login")).toBeTruthy();
    });

    it('render correctly', function () {
        const store = createStore(rootReducer)
        const tree = renderer.create(global.wrapperProvider(<Login />, store)).toJSON();
        expect(tree).toMatchSnapshot();
    })
})
