import React from "react";
import {Logo} from "loft-taxi-mui-theme";
import "./Login.css";
import {Button, Grid, Link, Paper, TextField, Typography,} from "@material-ui/core";
import {Link as RouterLink, Redirect} from 'react-router-dom';
import {authenticate, getAuth} from '../../redux/auth/'
import {connect} from "react-redux";
import {ErrorMessage, Field, Form, Formik, getIn} from 'formik';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .required('Required'),
});

const Login = (props) => {
    const {isLoggedIn, error} = props;

    const isShowerError = ({errors, name, touched}) => {
        const fieldError = getIn(errors, name);
        return getIn(touched, name) && !!fieldError
    }

    return (
            <div className="login" data-testid="login">
                {isLoggedIn ? <Redirect to='/map' /> : null}
                <div className="loginContainer">
                    <div className="registration__logo">
                        <Logo white/>
                    </div>
                    <Paper className="loginForm">
                        <Formik initialValues={{email: "", password: ""}}
                                validationSchema={SignInSchema}
                                onSubmit={(values, { setSubmitting }) => {
                                    props.authenticate(values);
                                    setSubmitting(false);
                                }}
                        >{({
                               errors,
                               touched,
                               isSubmitting,
                           }) => (<Form className="form">
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
                                                <Field as={TextField}
                                                       id="email"
                                                       error={isShowerError({errors, name: 'email', touched})}
                                                       label="Почта"
                                                       fullWidth
                                                       name="email"
                                                />
                                                <ErrorMessage component={Typography}
                                                              color="error"
                                                              name="email" />
                                            </div>
                                            <div className="formField">
                                                <Field as={TextField}
                                                    id="password"
                                                    type="password"
                                                    label="Пароль"
                                                    error={isShowerError({errors, name: 'password', touched})}
                                                    fullWidth
                                                    name="password"
                                                />
                                                <ErrorMessage component={Typography}
                                                              color="error"
                                                              name="password" />
                                            </div>
                                            {error ? <Typography color={"error"}>{error}</Typography> : null}
                                            <div className="formAction">
                                                <Button type="submit"
                                                        disabled={isSubmitting}
                                                        variant="contained"
                                                        color="primary">Войти</Button>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Form>)}
                        </Formik>
                    </Paper>
                </div>
            </div>);
}

export default connect(
    getAuth,
    {authenticate}
)(Login);
