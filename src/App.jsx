import React, {useEffect} from "react";
import "./App.css";
import HeaderWithAuth from "./components/Header/Header";
import Login from "./page/Login/Login";
import Map from "./page/Map/Map";
import Profile from "./page/Profile/Profile";
import Registration from "./page/Registration/Registration";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import { connect } from 'react-redux';
import PrivateRouter from "./components/PrivateRouter/PrivateRouter";
import {checkLogin} from "./redux/auth/actions";

const App = (props) => {
    const {isLoggedIn, checkLogin} = props;
    useEffect(() => {
        if (window.localStorage.getItem('state')){
            const initialState = {
                isLoggedIn:  JSON.parse(window.localStorage.getItem('state')).isLoggedIn,
                token: JSON.parse(window.localStorage.getItem('state')).token,
                error: null
            }
            checkLogin(initialState);
        }
    }, [checkLogin]);
    return (
        <div className="App">
            <Router>
                {isLoggedIn ? <HeaderWithAuth/> : null}
                <Switch>
                    <Route path='/' exact component={Login}/>
                    <Route path='/loginUp' component={Registration}/>
                    <PrivateRouter  path='/map' component={Map}/>
                    <PrivateRouter  path='/profile' component={Profile}/>
                    <Route path='*' component={Login}/>
                </Switch>
            </Router>
        </div>
    );
}

export default connect(
    (state) => ({isLoggedIn: state.auth.isLoggedIn}),
    {checkLogin}
)(App);
