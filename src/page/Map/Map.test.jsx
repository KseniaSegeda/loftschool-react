import ReactDOM from "react-dom";
import Map from "../../page/Map/Map";
import React from "react";
import renderer from "react-test-renderer";
import {render, act} from '@testing-library/react'
import mapboxgl from "mapbox-gl";
import {createStore} from "redux";
import rootReducer from "../../redux";
import {successSetCard} from "../../redux/payments";
import {successGetListAddress} from "../../redux/route";

jest.mock('mapbox-gl', () => ({
    GeolocateControl: jest.fn(),
    Map: jest.fn(() => ({
        addControl: jest.fn(),
        on: jest.fn(),
        remove: jest.fn()
    })),
    NavigationControl: jest.fn()
}));
const FAKE_DATA_CARD = {
    cardNumber: '1111 1111 1111 1111',
    expiryDate: '10/24',
    cardName: 'TEST TEST',
    cvc: '111'
}

describe('Map.js', () => {
    let store;
    beforeAll(() => {
        store = createStore(rootReducer);
    })

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(global.wrapperProvider(<Map/>, store), div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should call mapbox-gl', function () {
        const { getByTestId } = render(global.wrapperProvider(<Map />, store));
        expect(mapboxgl.Map).toHaveBeenCalledWith({
            container: getByTestId('map'),
            style: "mapbox://styles/mapbox/streets-v11",
            center: [30.302499027775248, 59.92261297636499],
            zoom: 11,
        });
    });

    it('render correctly', function () {
        const tree = renderer.create(global.wrapperProvider(<Map />, store)).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('card not set -> popup redirect profile', async function () {
        let  getByText;
        await act(async () => {
            getByText = render(global.wrapperProvider(<Map />, store)).getByText;
        });
        expect(getByText('Заполните платежные данные для заказа')).toBeInTheDocument();
    });

    it('card set -> popup open order', async function () {
        store.dispatch(successSetCard(FAKE_DATA_CARD));
        let  getByText;
        await act(async () => {
            getByText = render(global.wrapperProvider(<Map />, store)).getByText;
        });
        store.dispatch(successGetListAddress({addresses: [1,2,3,4]}));

        expect(getByText('Вызвать такси')).toBeInTheDocument();
    });

    it('card set -> popup open order(loading)', async function () {
        let  getByText;
        store.dispatch(successSetCard(FAKE_DATA_CARD));
        await act(async () => {
            getByText = render(global.wrapperProvider(<Map />, store)).getByText;
        });

        expect(getByText('Loading')).toBeInTheDocument();
    });
})
