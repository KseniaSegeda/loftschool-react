import ReactDOM from "react-dom";
import Login from "../Login/Login";
import renderer from "react-test-renderer";
import React from "react";

describe('login.js', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Login/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('render correctly', function () {
        const tree = renderer.create(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
