import React from "react";
import "../Login/Login.css";
import {Logo} from "loft-taxi-mui-theme";
import {Button, Grid, Link, Paper, TextField, Typography} from "@material-ui/core";
import {Link as RouterLink, Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {registration} from "../../redux/auth/";
import {getAuth} from "../../redux/auth";
import {Field, Form, Formik, getIn} from "formik";
import * as Yup from "yup";


const SignUnSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    name: Yup.string()
        .required('Required'),
    lastName: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required')
})
const Registration = (props) => {
    const {isLoggedIn, error, registration} = props;

    const isShowerError = ({errors, name, touched}) => {
        const fieldError = getIn(errors, name);
        return getIn(touched, name) && !!fieldError;
    }

    return (
        <div className="login" data-testid='registration'>
            {isLoggedIn ? <Redirect to='/map'/> : null}
            <div className="loginContainer">
                <div className="registration__logo">
                    <Logo white/>
                </div>
                <Paper className="loginForm">
                    <Formik initialValues={{
                        email: "",
                        name: "",
                        lastName: "",
                        password: ""
                    }}
                            validationSchema={SignUnSchema}
                            onSubmit={(values, {setSubmitting}) => {
                                registration(values)
                                setSubmitting(false);
                            }}
                    >{({
                           errors,
                           touched,
                           isSubmitting,
                       }) => (<Form className="form">
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
                                        <Field as={TextField}
                                               id="email"
                                               label="Адрес электронной почты"
                                               error={isShowerError({errors, name: 'email', touched})}
                                               fullWidth
                                               name="email"
                                               helperText={isShowerError({errors, name: 'email', touched}) ?
                                                   getIn(errors, 'email') : null}
                                        />
                                    </div>
                                    <div className="formField formField-half">
                                        <Field as={TextField}
                                               id="name"
                                               label="Имя"
                                               fullWidth
                                               name="name"
                                               error={isShowerError({errors, name: 'name', touched})}
                                               helperText={isShowerError({errors, name: 'name', touched}) ?
                                                   getIn(errors, 'name') : null}
                                        />
                                    </div>
                                    <div className="formField formField-half">
                                        <Field as={TextField}
                                               id="lastName"
                                               label="Фамилия"
                                               name="lastName"
                                               error={isShowerError({errors, name: 'lastName', touched})}
                                               helperText={isShowerError({errors, name: 'lastName', touched}) ?
                                                   getIn(errors, 'lastName') : null}
                                        />
                                    </div>
                                    <div className="formField">
                                        <Field as={TextField}
                                               id="password"
                                               type="password"
                                               label="Пароль"
                                               error={isShowerError({errors, name: 'password', touched})}
                                               fullWidth
                                               name="password"
                                               helperText={isShowerError({errors, name: 'password', touched}) ?
                                                   getIn(errors, 'password') : null}
                                        />
                                    </div>
                                    <div className="formAction">
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            disabled={isSubmitting}
                                        >Зарегистрироваться
                                        </Button>
                                    </div>
                                    {error ? <Typography color={"error"}>{error}</Typography> : null}
                                </Grid>
                            </Grid>
                        </div>
                    </Form>)}

                    </Formik>
                </Paper>
            </div>
        </div>
    );
}

export default connect(
    getAuth,
    {registration}
)(Registration);
