import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));
// severity could be error/warning/info/success
const MessageAlert = ({ message, severity }) => {
  const classes = useStyles();
  if (message) {
    return (
      <div className={classes.root}>
        <Alert severity={severity}>{message}</Alert>
      </div>
    );
  }
  return <div></div>;
};

MessageAlert.propTypes = {
  message: PropTypes.string,
  severity: PropTypes.string
};

export default MessageAlert;
