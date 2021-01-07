import React, {useState} from "react";
import "../Login/Login.css";
import {Logo} from "loft-taxi-mui-theme";
import {Button, Grid, Link, Paper, TextField, Typography} from "@material-ui/core";
import {withAuth} from "../../helpers/AuthContext";
import { useHistory, Link as RouterLink } from 'react-router-dom';


const Registration = ({customNavigation}) => {
    const history = useHistory();
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

        history.push('/map');
    }

    return (
        <div className="login" data-testid='registration'>
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
                                <Link data-testid="linkLogin" component={RouterLink} to="login">Войти</Link>
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
                                            id="lastName"
                                            label="Фамилия"
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
                                            value={formFields.password}
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

export default withAuth(Registration);
