import ReactDOM from "react-dom";
import Registration from "../Registration/Registration";
import renderer from "react-test-renderer";
import React from "react";
import {BrowserRouter} from "react-router-dom";

describe('Registration.js', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<BrowserRouter><Registration/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('render correctly', function () {
        const tree = renderer.create(<BrowserRouter><Registration /></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
