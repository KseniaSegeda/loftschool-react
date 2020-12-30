import ReactDOM from "react-dom";
import Login from "../Login/Login";
import renderer from "react-test-renderer";
import React from "react";
import {BrowserRouter} from "react-router-dom";

describe('login.js', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<BrowserRouter><Login/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('render correctly', function () {
        const tree = renderer.create(<BrowserRouter><Login /></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
