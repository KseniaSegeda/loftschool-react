import ReactDOM from "react-dom";
import Header from "../../components/Header/Header";
import renderer from "react-test-renderer";
import React from "react";
import {BrowserRouter} from "react-router-dom"

describe('Header.js', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <BrowserRouter>
                <Header/>
            </BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('render correctly', function () {
        const tree = renderer.create(<BrowserRouter><Header/></BrowserRouter>).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
