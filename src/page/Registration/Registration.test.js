import ReactDOM from "react-dom";
import Registration from "../Registration/Registration";
import renderer from "react-test-renderer";
import React from "react";

describe('Registration.js', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Registration/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('render correctly', function () {
        const tree = renderer.create(<Registration />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
