import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRouter = ({component: Component, isLoggedIn, ...rest}) => {
    return (
        <Route {...rest} render={(props) => isLoggedIn ?
            <Component {...props} /> : <Redirect to="/" />}
        />
    )
}

export default connect((state) => ({
    isLoggedIn: state.auth.isLoggedIn,
}))(PrivateRouter);
