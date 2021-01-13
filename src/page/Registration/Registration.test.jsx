import ReactDOM from "react-dom";
import Registration from "../Registration/Registration";
import renderer from "react-test-renderer";
import React from "react";
import {createStore} from "redux";
import rootReducer from "../../redux";

describe('Registration.js', () => {
    let store;
    beforeAll(() => {
        store = createStore(rootReducer);
    })

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(global.wrapperProvider(<Registration/>, store), div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('render correctly', function () {
        const tree = renderer.create(global.wrapperProvider(<Registration/>, store)).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
