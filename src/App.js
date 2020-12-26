import React, {useState} from "react";
import "./App.css";
import {HeaderWithAuth} from "./components/Header/Header";
import LoginWithAuth from "./page/Login/Login";
import Map from "./page/Map/Map";
import RegistrationWithAuth from "./page/Registration/Registration";
import Profile from "./page/Profile/Profile";
import {withAuth} from "./helpers/AuthContext";

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
