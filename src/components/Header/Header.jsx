import React from "react";
import "./Header.css";
import {Logo} from "loft-taxi-mui-theme";
import {Button, Container, Paper} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logOut, getAuth} from "../../redux/auth/";

const Header = (props) => {
    const buttonList = [
        {
            name: "map",
            text: "Карта",
        },
        {
            name: "profile",
            text: "Профиль",
        }
    ];
    return (
        <Paper data-testid='header' elevation={4} tag="header" className="header">
            <Container>
                <div className="container">
                    <div className="logo">
                        <Logo/>
                    </div>
                    <nav className="nav">
                        <ul className="navList">
                            {buttonList.map(({name, text}) => (
                                <li className="navItem" key={name}>
                                    <Button data-testid={'nav_' + name}>
                                        <Link to={name}>{text}</Link>
                                    </Button>
                                </li>
                            ))}
                            <li className="navItem">
                                <Link to='logIn'>
                                    <Button data-testid="nav_exit" onClick={()=> props.logOut()}>Выйти</Button>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </Container>
        </Paper>
    );
}

export default connect(
    getAuth,
    {logOut}
)(Header);
