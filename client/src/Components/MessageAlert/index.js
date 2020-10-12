import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));
// severity could be error/warning/info/success
const MessageAlert = ({message, severity}) => {
  const classes = useStyles();
  if(message) {
    return (
        <div className={classes.root}>
          <Alert severity={severity}>{message}</Alert>
        </div>
      );
  }
  else {
      return (
          <div></div>
      );
  }
  
}

export default MessageAlert;