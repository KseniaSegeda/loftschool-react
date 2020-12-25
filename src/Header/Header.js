import React from "react";
import "./Header.css";
import {Logo} from "loft-taxi-mui-theme";
import {Button, Container, Paper} from "@material-ui/core";
import PropTypes from 'prop-types';
import { withAuth } from "../AuthContext";

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
        <Paper elevation={4} tag="header" className="header">
            <Container>
                <div className="container">
                    <div className="logo">
                        <Logo/>
                    </div>
                    <nav className="nav">
                        <ul className="navList">
                            {buttonList.map(({name, text}) => (
                                <li className="navItem" key={name}>
                                    <Button onClick={() => customNavigation(name)}>{text}</Button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </Container>
        </Paper>
    );
}
Header.prototype = {
    customNavigation: PropTypes.func.isRequired
}

export const  HeaderWithAuth = withAuth(Header);
