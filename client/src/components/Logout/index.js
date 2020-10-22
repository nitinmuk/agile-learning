import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
const Logout = ({ handleLogout }) => {
  useEffect(() => {
    handleLogout();
  }, []);
  return <Redirect to="/login" />;
};
Logout.propTypes = {
  handleLogout: PropTypes.func.isRequired
};

export default Logout;
