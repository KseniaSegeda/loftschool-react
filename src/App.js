import React, {useState} from "react";
import "./App.css";
import Header from "./Header";
import Login from "./Login";
import Map from "./Map";
import Registration from "./Registration";
import Profile from "./Profile";

function App() {
    const [page, setPage] = useState("login");
    const onPageChange = (e) => {
        e.preventDefault();
        setPage(e.target.name);
    };

    const PAGES = {
        login: <Login onPageChange={onPageChange}/>,
        registration: <Registration onPageChange={onPageChange}/>,
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
