import {Button, Paper} from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import "../OpenOrder/OpenOrder.css";

const PaymentsOrder = () => {
    return <Paper className="openOrder">
        <div className="containerOpenOrder">
            <Typography>Заполните платежные данные для заказа</Typography>
        </div>
        <Button variant="contained" color="primary">
            <Link to='/profile'>Заполнить</Link>
        </Button>
    </Paper>
}

export default PaymentsOrder;
