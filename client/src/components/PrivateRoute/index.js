import React from "react";
import { Redirect, Route } from "react-router-dom";
import isAuthenticated from "../../utils/isAuthenticated";

export const PrivateRoute = ({ component : Component, ...rest}) => {
    return(
        <Route render={props => 
            isAuthenticated() ? 
            (<Component {...props} {...rest}/> ) :
            (<Redirect to={{pathname: "/login", state: {from: props.location}}}/>)
            }>
        </Route>
    )
}

export default PrivateRoute;