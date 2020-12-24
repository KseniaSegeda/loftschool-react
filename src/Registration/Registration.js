import React, {useState} from "react";
import "./Login.css";
import PropTypes from 'prop-types';
import {Logo} from "loft-taxi-mui-theme";
import {Button, Grid, Link, Paper, TextField, Typography} from "@material-ui/core";


const Registration = ({customNavigation}) => {
    const [formFields, setFormField] = useState({
        email: "",
        name: "",
        lastName: "",
        password: "",
    });

    const onChange = (e) => {
        setFormField({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitForm = (e) =>{
        e.preventDefault();

        customNavigation('map');
    }

    return (
        <div className="login">
            <div className="loginContainer">
                <div className="registration__logo">
                    <Logo white/>
                </div>
                <Paper className="loginForm">
                    <form className="form" onSubmit={onSubmitForm}>
                        <div className="title">
                            <Typography variant="h4">Регистрация</Typography>
                            <div>
                            <span>Уже зарегистрирован?&nbsp;
                                <Link onClick={() => customNavigation("login")}>Войти</Link>
                            </span>
                            </div>
                        </div>
                        <div className="formContainer">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className="formField">
                                        <TextField
                                            id="email"
                                            type="email"
                                            label="Адрес электронной почты"
                                            fullWidth
                                            name="email"
                                            value={formFields.email}
                                            onChange={onChange}
                                        >
                                        </TextField>
                                    </div>
                                    <div className="formField formField-half">
                                        <TextField
                                            id="name"
                                            label="Имя"
                                            fullWidth
                                            name="name"
                                            value={formFields.name}
                                            onChange={onChange}
                                        >
                                        </TextField>
                                    </div>
                                    <div className="formField formField-half">
                                        <TextField
                                            id="name"
                                            label="Фамилия"
                                            fullWidth
                                            name="lastName"
                                            value={formFields.lastName}
                                            onChange={onChange}
                                        >
                                        </TextField>
                                    </div>
                                    <div className="formField">
                                        <TextField
                                            id="password"
                                            type="password"
                                            label="Пароль"
                                            fullWidth
                                            name="password"
                                            value={formFields.lastName}
                                            onChange={onChange}
                                        >
                                        </TextField>
                                    </div>
                                    <div className="formAction">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                        >Зарегистрироваться
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </Paper>
            </div>
        </div>
    );
}
Registration.prototype = {
    customNavigation: PropTypes.func
}

export default Registration;