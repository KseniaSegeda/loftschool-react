import React, {useState} from "react";
import "./App.css";
import {HeaderWithAuth} from "./Header/Header";
import LoginWithAuth from "./Login/Login";
import Map from "./Map/Map";
import RegistrationWithAuth from "./Registration/Registration";
import Profile from "./Profile/Profile";
import {withAuth} from "./AuthContext";

const App = (props) => {
    const { isLoggedIn } = props;
    const [page, setPage] = useState("login");

    const customNavigation = (page) => {
        if(!isLoggedIn && page !== 'registration'){
            setPage('login');
            return
        }
        setPage(page);
    }

    const PAGES = {
        login: (props) => <LoginWithAuth {...props}/>,
        registration: (props) => <RegistrationWithAuth {...props}/>,
        map:(props) => <Map/>,
        profile:(props) => <Profile/>,
    }

    return (
        <div className="App">
            {isLoggedIn ? <HeaderWithAuth customNavigation={customNavigation}/> : null}
            <main> {PAGES[page]({customNavigation})}</main>
        </div>

    );
}

export default withAuth(App);
