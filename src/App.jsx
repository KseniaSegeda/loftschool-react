import React from "react";
import "./App.css";
import HeaderWithAuth from "./components/Header/Header";
import Login from "./page/Login/Login";
import Map from "./page/Map/Map";
import Profile from "./page/Profile/Profile";
import Registration from "./page/Registration/Registration";
import {withAuth} from "./helpers/AuthContext";
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"

const App = (props) => {
    const {isLoggedIn} = props;

    return (
        <Router>
            <div className="App" >
                {isLoggedIn ? <HeaderWithAuth/> : null}
                <Switch>
                    <Route path='/' exact component={Login}/>
                    <Route path='/loginUp' component={Registration}/>
                    <Route path='/map'>
                        {isLoggedIn ? <Map /> : <Redirect to='/' />}
                    </Route>
                    <Route path='/profile'>
                        {isLoggedIn ? <Profile /> : <Redirect to='/' />}
                    </Route>
                    <Route path='*' component={Login} />
                </Switch>
            </div>
        </Router>
    );
}

export default withAuth(App);
