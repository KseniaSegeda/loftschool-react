import {Button, Paper} from "@material-ui/core";
import React, {useEffect} from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./OpenOrder.css";
import {connect} from "react-redux";
import {pendingGetListAddress, pendingGetRouter} from "../../redux/route/";
import {Form, Formik, getIn} from "formik";
import * as Yup from "yup";

const OrderSchema = Yup.object().shape({
    fromRoute: Yup.string()
        .required('Required'),
    toRoute: Yup.string()
        .notOneOf([Yup.ref('fromRoute')], "Конечный путь отправление, не может быть начальным")
        .required('Required'),
});

const OpenOrder = (props) => {
    const {listAddress, pendingGetRouter, pendingGetListAddress} = props;
    useEffect(() => {
        pendingGetListAddress()
    }, [pendingGetListAddress])

    const isShowerError = ({errors, name, touched}) => {
        const fieldError = getIn(errors, name);
        return getIn(touched, name) && !!fieldError;
    }

    return <Paper className="openOrder">
        {
            !listAddress ? 'Loading' :
                <Formik initialValues={{
                    fromRoute: '',
                    toRoute: ''
                }}
                        validationSchema={OrderSchema}
                        onSubmit={(values, {setSubmitting}) => {
                            pendingGetRouter(values);
                            setSubmitting(false);
                        }}
                >
                    {({
                          errors,
                          touched,
                          values,
                          setFieldValue
                      }) => (<Form>
                        <Autocomplete
                            id="fromRoute"
                            name="fromRoute"
                            value={values.fromRoute}
                            onChange={(e, vall) => setFieldValue('fromRoute', vall)}
                            getOptionLabel={(option) => option}
                            className="inputAddress"
                            renderInput={(params) =>
                                <TextField
                                    error={isShowerError({errors, name: 'fromRoute', touched})}
                                    helperText={isShowerError({errors, name: 'fromRoute', touched}) ?
                                        getIn(errors, 'fromRoute') : null}
                                    name="fromRoute" {...params} label="Откуда"/>}
                            options={listAddress}

                        />
                        <Autocomplete
                            id="toRoute"
                            name="toRoute"
                            value={values.toRoute}
                            onChange={(e, vall) => setFieldValue('toRoute', vall)}
                            getOptionLabel={(option) => option}
                            className="inputAddress"
                            renderInput={(params) =>
                                <TextField
                                    error={isShowerError({errors, name: 'toRoute', touched})}
                                    helperText={isShowerError({errors, name: 'toRoute', touched}) ?
                                        getIn(errors, 'toRoute') : null}
                                    name="fromRoute" {...params} label="Куда"/>}
                            options={listAddress}

                        />
                        <Button type="submit"
                                variant="contained"
                                fullWidth
                                color="primary">Вызвать такси</Button>
                    </Form>)}
                </Formik>
        }
    </Paper>
}

export default connect(() => ({}), {pendingGetRouter, pendingGetListAddress})(OpenOrder);
