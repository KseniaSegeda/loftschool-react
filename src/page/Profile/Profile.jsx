import React, {useEffect, useState} from "react";
import {Button, Grid, Paper, TextField, Typography} from "@material-ui/core";
import {MCIcon} from 'loft-taxi-mui-theme';
import './Profile.css';
import DateFnsUtils from '@date-io/date-fns';
import {DatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import {getCard, pendingGetCard, pendingSetCard} from "../../redux/payments/";
import {connect} from "react-redux";
import * as Yup from "yup";
import {Field, Form, Formik, getIn} from "formik";

const PaymentsSchema = Yup.object().shape({
    cardNumber: Yup.string()
        .required('Required')
        .matches(/\d{13,18}/, 'не верный формат'),
    expiryDate: Yup.string().required('Required'),
    cardName: Yup.string()
        .required('Required'),
    cvc: Yup.string().required('Required')
        .matches(/\d{3,5}/, 'не верный формат')
})

const Profile = (props) => {
    const isShowerError = ({errors, name, touched}) => {
        const fieldError = getIn(errors, name);
        return getIn(touched, name) && !!fieldError;
    }

    const {pendingSetCard, pendingGetCard, cardNumber, expiryDate, cardName, cvc} = props;
    const [isUpdateCard, setIsUpdateCard] = useState(true);
    useEffect(() => {
        if (isUpdateCard) {
            pendingGetCard();
            setIsUpdateCard(false)
        }

    }, [isUpdateCard, cardNumber, expiryDate, cardName, cvc, pendingGetCard]);


    return <div className="profile" data-testid="profile">
        <div className="profile__container">
            <Paper className="profile__window">
                <div className="profile-title">
                    <div className="profile-title__header">
                        <Typography variant="h4">Профиль</Typography>
                    </div>
                    <div className="profile-title__subtext">
                        <Typography variant="body1">Способ оплаты</Typography>
                    </div>
                </div>
                {props.isLoading ?
                    <Formik initialValues={{cardNumber, expiryDate, cardName, cvc, pendingGetCard}}
                            validationSchema={PaymentsSchema}
                            onSubmit={(values, {setSubmitting}) => {
                                console.log(values)
                                pendingSetCard(values);
                                setSubmitting(false);
                            }}
                    >{({
                           errors,
                           touched,
                           values,
                           setFieldValue
                       }) => (
                        <Form>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Grid container spacing={4} justify="center">
                                        <>
                                            <Grid item xs={6}>
                                                <Paper elevation={4} className="profile-form__block">
                                                    <div className="icon">
                                                        <MCIcon/>
                                                    </div>
                                                    <div className="form__field">
                                                        <Field as={TextField}
                                                               id="cardNumber"
                                                               label="Номер карты"
                                                               type="cardNumber"
                                                               fullWidth
                                                               placeholder="0000 0000 0000 0000"
                                                               name="cardNumber"
                                                               required
                                                               error={isShowerError({
                                                                   errors,
                                                                   name: 'cardNumber',
                                                                   touched
                                                               })}
                                                               helperText={isShowerError({
                                                                   errors,
                                                                   name: 'cardNumber',
                                                                   touched
                                                               }) ?
                                                                   getIn(errors, 'cardNumber') : null}
                                                        />
                                                    </div>
                                                    <div className="form__field">
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <DatePicker
                                                                value={values.expiryDate}
                                                                onChange={(value) => setFieldValue('expiryDate', value)}
                                                                name="expiryDate"
                                                                id="expiryDate"
                                                                openTo="year"
                                                                views={["year", "month"]}
                                                                format="MM/yy"
                                                                InputLabelProps={{shrink: true}}
                                                                autoOk={true}
                                                                fullWidth
                                                                required
                                                                error={isShowerError({
                                                                    errors,
                                                                    name: 'expiryDate',
                                                                    touched
                                                                })}
                                                                helperText={isShowerError({
                                                                    errors,
                                                                    name: 'expiryDate',
                                                                    touched
                                                                }) ?
                                                                    getIn(errors, 'expiryDate') : null}
                                                            />
                                                        </MuiPickersUtilsProvider>
                                                    </div>
                                                </Paper>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Paper elevation={4} className="profile-form__block">
                                                    <div className="form__field">
                                                        <Field as={TextField}
                                                               id="cardName"
                                                               label="Имя владельца"
                                                               type="cardName"
                                                               fullWidth
                                                               name="cardName"
                                                               placeholder="USER NAME"
                                                               required
                                                               error={isShowerError({
                                                                   errors,
                                                                   name: 'cardName',
                                                                   touched
                                                               })}
                                                               helperText={isShowerError({
                                                                   errors,
                                                                   name: 'cardName',
                                                                   touched
                                                               }) ?
                                                                   getIn(errors, 'cardName') : null}
                                                        />
                                                    </div>
                                                    <div className="form__field">
                                                        <Field as={TextField}
                                                               id="cvc"
                                                               label="CVC"
                                                               type="cvc"
                                                               fullWidth
                                                               name="cvc"
                                                               required
                                                               error={isShowerError({errors, name: 'cvc', touched})}
                                                               helperText={isShowerError({
                                                                   errors,
                                                                   name: 'cvc',
                                                                   touched
                                                               }) ?
                                                                   getIn(errors, 'cvc') : null}
                                                        />
                                                    </div>
                                                </Paper>
                                            </Grid>
                                        </>

                                        <div>
                                            <Button type="submit" variant="contained" color="primary">
                                                Сохранить
                                            </Button>
                                        </div>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>)}
                    </Formik> : <Grid item xs={6}>loading....</Grid>}
            </Paper>
        </div>
    </div>
}

export default connect(
    getCard,
    {pendingSetCard, pendingGetCard}
)(Profile);
