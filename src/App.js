import React, {useState} from "react";
import "./App.css";
import HeaderWithAuth from "./components/Header/Header";
import LoginWithAuth from "./page/Login/Login";
import Map from "./page/Map/Map";
import RegistrationWithAuth from "./page/Registration/Registration";
import Profile from "./page/Profile/Profile";
import {withAuth} from "./helpers/AuthContext";

const App = (props) => {
    const {isLoggedIn, pageProps} = props;
    const [page, setPage] = useState(pageProps ? pageProps : "login");
    const customNavigation = (page) => {
        if (!isLoggedIn && page !== 'registration') {
            setPage('login');
            return
        }
        setPage(page);
    }

    return (
        <div className="App">
            {isLoggedIn ? <HeaderWithAuth customNavigation={customNavigation}/> : null}
            {page === 'login' ? <LoginWithAuth customNavigation={customNavigation}/> : null}
            {page === 'registration' ? <RegistrationWithAuth customNavigation={customNavigation}/> : null}
            {page === 'map' ? <Map /> : null}
            {page === 'profile' ? <Profile/> : null}
        </div>
    );
}

export default withAuth(App);
