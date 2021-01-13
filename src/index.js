import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {theme} from "loft-taxi-mui-theme";
import {MuiThemeProvider} from "@material-ui/core/styles";
import {Provider} from 'react-redux';
import {store} from './store';


ReactDOM.render(
    <React.StrictMode>
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <App/>
            </Provider>
        </MuiThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
