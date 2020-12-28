import ReactDOM from "react-dom";
import Header from "../../components/Header/Header";
import renderer from "react-test-renderer";
import React from "react";

describe('Header.js', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Header/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('render correctly', function () {
        const tree = renderer.create(<Header />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
