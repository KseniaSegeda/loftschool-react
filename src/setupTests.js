import '@testing-library/jest-dom/extend-expect';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux'
import React from "react";
import { render } from '@testing-library/react'

jest.mock('mapbox-gl')
window.URL.createObjectURL = jest.fn()

global.renderWithProviders = function(children, store) {
    let rendered = render(
        global.wrapperProvider(children, store)
    );

    return {
        ...rendered,
        store
    };
}

global.wrapperProvider = (children, store) => (
    <BrowserRouter>
        <Provider store={store}>{children}</Provider>
    </BrowserRouter>
)
