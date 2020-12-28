import ReactDOM from "react-dom";
import Map from "../../page/Map/Map";
import React from "react";
import renderer from "react-test-renderer";
jest.mock('mapbox-gl', () => ({
    Map: jest.fn()
}));

describe('Map.js', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Map/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('render correctly', function () {
        const tree = renderer.create(<Map />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
