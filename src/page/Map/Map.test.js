import ReactDOM from "react-dom";
import Map from "../../page/Map/Map";
import React from "react";
import renderer from "react-test-renderer";
import { render } from '@testing-library/react'
import mapboxgl from "mapbox-gl";

jest.mock('mapbox-gl', () => ({
    GeolocateControl: jest.fn(),
    Map: jest.fn(() => ({
        addControl: jest.fn(),
        on: jest.fn(),
        remove: jest.fn()
    })),
    NavigationControl: jest.fn()
}));

describe('Map.js', () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<Map/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should call mapbox-gl', function () {
        const { getByTestId } = render( <Map />);
        expect(mapboxgl.Map).toHaveBeenCalledWith({
            container: getByTestId('map'),
            style: "mapbox://styles/mapbox/streets-v11",
            center: [37.61513, 55.7513461], // moscow
            zoom: 11,
        });
    });

    it('render correctly', function () {
        const tree = renderer.create(<Map />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})
