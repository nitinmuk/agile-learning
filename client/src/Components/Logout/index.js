import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
const Logout = (props) => {
    useEffect(() => {
        props.handleLogout();
    }, []);
    return (
        <Redirect to="/login" />
    );
}

export default Logout;