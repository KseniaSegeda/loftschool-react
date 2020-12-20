import React from "react";
import "./Header.css";

const Header = ({customNavigation}) => {
    const buttonList = [
        {
            name: "map",
            text: "Карта",
        },
        {
            name: "profile",
            text: "Профиль",
        },
        {
            name: "login",
            text: "Войти",
        },
    ];
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <span className="logoText">Logo</span>
                </div>
                <nav className="nav">
                    <ul className="navList">
                        {buttonList.map(({ name, text }) => (
                            <li className="navItem" key={name}>
                                <button
                                    className="navLink"
                                    onClick={() => customNavigation(name)}
                                >
                                    {text}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;
