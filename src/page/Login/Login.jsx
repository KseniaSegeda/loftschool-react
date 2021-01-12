import React, {useState} from "react";
import {Logo} from "loft-taxi-mui-theme";
import "./Login.css";
import {
    Typography,
    Link,
    TextField,
    Paper,
    Grid,
    Button,
} from "@material-ui/core";
import {Link as RouterLink, Redirect} from 'react-router-dom';
import {authenticate} from '../../redux/auth/actions'
import {connect} from "react-redux";
import {getAuth} from "../../redux/auth/reducer";

const Login = (props) => {
    const [formFields, setFormField] = useState({
        email: "",
        password: "",
    });
    const {isLoggedIn, error} = props;
    const onChange = (e) => {
        setFormField({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        props.authenticate(formFields);
    }

    return (
            <div className="login" data-testid="login">
                {isLoggedIn ? <Redirect to='/map' /> : null}
                <div className="loginContainer">
                    <div className="registration__logo">
                        <Logo white/>
                    </div>
                    <Paper className="loginForm">
                        <form className="form" onSubmit={onSubmitForm}>
                            <div className="title">
                                <Typography variant="h4">Войти</Typography>
                                <div>
                            <span>Новый пользователь?&nbsp;
                                <Link data-testid='linkRegistration' component={RouterLink} to="loginUp">
                                    Зарегистрируйтесь
                                </Link>
                            </span>
                                </div>
                            </div>
                            <div className="formContainer">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className="formField">
                                            <TextField
                                                id="name"
                                                label="Почта"
                                                fullWidth
                                                name="email"
                                                value={formFields.name}
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
                                        {error ? <Typography color={"error"}>{error}</Typography> : null}
                                        <div className="formAction">
                                            <Button type="submit"
                                                    variant="contained"
                                                    color="primary">Войти</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    </Paper>
                </div>
            </div>);
}

export default connect(
    (state) => getAuth(state),
    {authenticate}
)(Login);
