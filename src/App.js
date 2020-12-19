import React, {useState} from "react";
import "./App.css";
import Header from "./Header";
import Login from "./Login";
import Map from "./Map";
import Registration from "./Registration";
import Profile from "./Profile";

const App = () => {
    const [page, setPage] = useState("login");
    const customNavigation = (page) =>{
        setPage(page);
    }
    const onPageChange = (e) => {
        e.preventDefault();
        customNavigation(e.target.name);
    };

    const PAGES = {
        login: <Login customNavigation={customNavigation}/>,
        registration: <Registration customNavigation={customNavigation}/>,
        map: <Map/>,
        profile: <Profile/>,
    }

    return (
        <div className="App">
            <Header onPageChange={onPageChange}/>
            <main> {PAGES[page]}</main>
        </div>
    );
}

export default App;
