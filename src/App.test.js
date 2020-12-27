import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import renderer from "react-test-renderer";
import {shallow, mount, render} from "enzyme";
import LoginWithAuth from "./page/Login/Login";
import HeaderWithAuth from "./components/Header/Header";


jest.mock('mapbox-gl', () => ({
    Map: jest.fn()
}));


describe('app.js', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('render correctly', function () {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('render correctly with props isLoggedIn', function () {
        const tree = renderer.create(<App isLoggedIn={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("renders shallow", () => {
        const wrapper = shallow(<App />);
        expect(wrapper.contains(<LoginWithAuth />)).toEqual(true);
    });
})

