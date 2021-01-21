import {createStore} from "redux";
import rootReducer from "../../redux";
import ReactDOM from "react-dom";
import React from "react";
import Profile from "./Profile";
import renderer from "react-test-renderer";
import {render} from "@testing-library/react";

// const FAKE_DATA_CARD = {
//     cardNumber: '1111 1111 1111 1111',
//     expiryDate: '10/24',
//     cardName: 'TEST TEST',
//     cvc: '111'
// }

describe('Profile', () => {
    let store;
    beforeAll(() => {
        store = createStore(rootReducer);
    })

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(global.wrapperProvider(<Profile/>, store), div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('render correctly', function () {
        const tree = renderer.create(global.wrapperProvider(<Profile />, store)).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('card not set -> loading', function () {
        const { getByText, getByTestId } = render(
            global.wrapperProvider(<Profile />, store)
        );
        expect(getByText('loading....')).toBeInTheDocument();
    });
});
