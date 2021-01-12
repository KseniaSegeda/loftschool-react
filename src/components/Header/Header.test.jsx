import ReactDOM from "react-dom";
import Header from "../../components/Header/Header";
import renderer from "react-test-renderer";
import React from "react";
import {createStore} from "redux";
import rootReducer from "../../redux";

describe('Header.js', () => {
    let store;
    beforeAll(() => {
        store = createStore(rootReducer);
    })

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(global.wrapperProvider(<Header/>, store), div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('render correctly', function () {
        const tree = renderer.create(global.wrapperProvider(<Header/>, store)).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
