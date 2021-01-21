import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {getAuth} from "../../redux/auth";

const PrivateRouter = ({component: Component, auth,isLoggedIn, ...rest}) => {
    return (
        <Route {...rest} render={(props) => isLoggedIn ?
            <Component {...props} /> : <Redirect to="/" />}
        />
    )
}

export default connect(getAuth, {})(PrivateRouter);
