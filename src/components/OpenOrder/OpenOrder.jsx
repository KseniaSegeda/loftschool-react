import {Button, Paper} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import "./OpenOrder.css";
import {connect} from "react-redux";
import {pendingGetRouter, pendingGetListAddress} from "../../redux/route/";


const OpenOrder = (props) => {
    const {listAddress, pendingGetRouter, pendingGetListAddress} = props;
    const [formFields, setFormField] = useState({
        fromRoute: '',
        toRoute: ''
    });
    useEffect(() => {
        pendingGetListAddress()
    }, [pendingGetListAddress])

    const onChange = (name, newValue) => {
        setFormField({
            ...formFields,
            [name]: newValue,
        });
    };
    const submit = (e) => {
        e.preventDefault();
        console.log(formFields)
        pendingGetRouter(formFields)
    }
    return <Paper className="openOrder">
        {
            !listAddress ? 'Loading' :
                <form onSubmit={submit}>
                    <Autocomplete
                        id="fromRoute"
                        name="fromRoute"
                        onChange={(e, newValue) => {
                            onChange("fromRoute", newValue)
                        }}
                        getOptionLabel={(option) => option}
                        className="inputAddress"
                        renderInput={(params) => <TextField name="fromRoute" {...params} label="Откуда"/>}
                        options={listAddress}
                    />
                    <Autocomplete
                        id="toRoute"
                        name="toRoute"
                        onChange={(e, newValue) => {
                            onChange("toRoute", newValue)
                        }}
                        getOptionLabel={(option) => option}
                        className="inputAddress"
                        renderInput={(params) => <TextField name="fromRoute" {...params} label="Куда"/>}
                        options={listAddress}
                    />
                    <Button type="submit"
                            variant="contained"
                            fullWidth
                            color="primary">Вызвать такси</Button>
                </form>
        }
    </Paper>
}

export default connect(()=>({}), {pendingGetRouter, pendingGetListAddress})(OpenOrder);
