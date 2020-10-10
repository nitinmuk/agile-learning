import React from "react";
import { Redirect, Route } from "react-router-dom";
import API from "../../utils/API";

export const PrivateRoute = ({ component : Component, ...rest}) => {
    console.log('isAuthenticated',API.isAuthenticated())
    return(
        <Route {...rest} render={props => 
            API.isAuthenticated() ? 
            (<Component {...props}/> ) :
            (<Redirect to={{pathname: "/login", state: {from: props.location}}}/>)
            }>

        </Route>
    )
}

export default PrivateRoute;