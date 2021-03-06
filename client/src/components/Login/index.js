import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import MessageAlert from "../MessageAlert";
import CircularIndeterminate from "../CircularIndeterminate";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  root: {
    background: "#deb887", //burlywood color
    color: "white",
    padding: "30px",
    height: "100vh"
  }
}));

const Login = ({
  isLoggedIn,
  appStatus,
  emailRef,
  passwordRef,
  handleLogin,
  message,
  location
}) => {
  const classes = useStyles();
  if (isLoggedIn) {
    return <Redirect to={{ pathname: "/", state: { from: location } }} />;
  }
  switch (appStatus) {
    case "processing":
      return (
        <Container component="main" maxWidth="sm">
          <CircularIndeterminate />
        </Container>
      );
    default:
      return (
        <Grid className={classes.root}>
          <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      inputRef={emailRef}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      inputRef={passwordRef}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <MessageAlert {...message} />
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      Not have an account yet? Sign up
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </Grid>
      );
  }
};

Login.propTypes = {
  isLoggedIn: PropTypes.bool,
  appStatus: PropTypes.string.isRequired,
  emailRef: PropTypes.object.isRequired,
  passwordRef: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  message: PropTypes.object,
  location: PropTypes.object.isRequired
};
export default Login;
