import React, {useState} from "react";
import {Paper, TextField, Typography, Grid, Button} from "@material-ui/core";
import {MCIcon} from 'loft-taxi-mui-theme';
import './Profile.css';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {pendingSetCard} from "../../redux/payments/actions";
import {connect} from "react-redux";

const Profile = (props) => {
    const {token, pendingSetCard} = props;
    const [formFields, setFormField] = useState({
        cardNumber: "",
        expiryDate: new Date(),
        cardName: "",
        cvc: "",
        token: token
    });
    const onChange = (e) => {
        setFormField({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    };

    const onDateChange = date => {
        setFormField({
            ...formFields,
            expiryDate: date
        })
    }


    const submit = (e) => {
        e.preventDefault();
        pendingSetCard(formFields);
    };
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
                <form onSubmit={submit}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid container spacing={4} justify="center">
                                <Grid item xs={6}>
                                    <Paper elevation={4} className="profile-form__block">
                                        <div className="icon">
                                            <MCIcon />
                                        </div>
                                        <div className="form__field">
                                            <TextField
                                                id="cardNumber"
                                                label="Номер карты"
                                                type="cardNumber"
                                                fullWidth
                                                placeholder="0000 0000 0000 0000"
                                                name="cardNumber"
                                                value={formFields.cardNumber}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                        <div className="form__field">
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <DatePicker
                                                    name="expiryDate"
                                                    id="expiryDate"
                                                    value={formFields.expiryDate}
                                                    onChange={onDateChange}
                                                    openTo="year"
                                                    views={["year", "month"]}
                                                    format="MM/yy"
                                                    InputLabelProps={{ shrink: true }}
                                                    autoOk={true}
                                                    fullWidth
                                                    required
                                                />
                                            </MuiPickersUtilsProvider>
                                        </div>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper elevation={4} className="profile-form__block">
                                        <div className="form__field">
                                            <TextField
                                                id="cardName"
                                                label="Имя владельца"
                                                type="cardName"
                                                fullWidth
                                                name="cardName"
                                                placeholder="USER NAME"
                                                value={formFields.cardName}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                        <div className="form__field">
                                            <TextField
                                                id="cvc"
                                                label="CVC"
                                                type="cvc"
                                                fullWidth
                                                name="cvc"
                                                value={formFields.cvc}
                                                onChange={onChange}
                                                required
                                            />
                                        </div>
                                    </Paper>
                                </Grid>
                                <div>
                                    <Button type="submit" variant="contained" color="primary">
                                        Сохранить
                                    </Button>
                                </div>

                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    </div>
}

export default connect(
    (state) => state,
    {pendingSetCard}
)(Profile);
