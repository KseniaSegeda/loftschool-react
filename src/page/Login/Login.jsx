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
import {useHistory, Link as RouterLink} from 'react-router-dom';
import {withAuth} from "../../helpers/AuthContext";

const Login = (props) => {
    const {logIn, isLoggedIn} = props;
    const [formFields, setFormField] = useState({
        name: "",
        password: "",
    });
    const history = useHistory();

    const onChange = (e) => {
        setFormField({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        logIn(formFields.name, formFields.password);
        history.push('/map')
    }

    return (
        <div className="login" data-testid="login">
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
                                            label="Имя"
                                            fullWidth
                                            name="name"
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

export default withAuth(Login);
