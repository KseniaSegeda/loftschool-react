import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, fireEvent} from '@testing-library/react'
import renderer from "react-test-renderer";


jest.mock('mapbox-gl', () => ({
    GeolocateControl: jest.fn(),
    Map: jest.fn(() => ({
        addControl: jest.fn(),
        on: jest.fn(),
        remove: jest.fn()
    })),
    NavigationControl: jest.fn()
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
        // const {container, asFragment} = render(<App isLoggedIn={true}/>);
        // expect(asFragment).toMatchSnapshot()

        const tree = renderer.create(<App isLoggedIn={true} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('starting app.js login page', function(){
        const { getByTestId } = render(<App />);
        expect(getByTestId('login')).toBeInTheDocument();
    });

    it('click link -> change registration/login', function(){
        const { getByTestId } = render(<App />);

        fireEvent.click(getByTestId('linkRegistration'))
        expect(getByTestId('registration')).toBeInTheDocument();
        fireEvent.click(getByTestId('linkLogin'))
        expect(getByTestId('login')).toBeInTheDocument();
    });


    it('click  map button in navigation -> change page on map', function(){
        const { getByText,getByTestId } = render(<App isLoggedIn={true}/>);
        fireEvent.click(getByText('Карта'));
        expect(getByTestId('map')).toBeInTheDocument();
    });

    it('click profile button in navigation -> change page on profile', function(){
        const { getByText,getByTestId } = render(<App  isLoggedIn={true}/>);

        fireEvent.click(getByText('Профиль'))
        expect(getByTestId('profile')).toBeInTheDocument();
    });
})

