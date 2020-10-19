import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from "react-router-dom";
import { Collapse } from '@material-ui/core';
import CircularIndeterminate from "../CircularIndeterminate";
import MessageAlert from '../MessageAlert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    background: "#FF8E53",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: "30px",
  },
}));

const SignUp = (props) => {
  const classes = useStyles();
  if (props.isLoggedIn) {
    return (<Redirect to={{ pathname: "/", state: { from: props.location } }} />
    );
  } else {
    switch (props.appStatus) {
      case "processing":
        return (
          <Container component="main" maxWidth="sm">
            <CircularIndeterminate />
          </Container>
        )
      default:
        return (
          <Container className={classes.root}>
            <Container component="main" maxWidth="xs">
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
          </Typography>
                <form className={classes.form} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        inputRef={props.fNameRef}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        inputRef={props.lNameRef}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        inputRef={props.emailRef}
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
                        inputRef={props.passwordRef}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}></Grid>
                    <Grid item xs={12} sm={8}>
                      <FormControlLabel
                        label={props.studentUser ? "Sign up as Student" : "Sign up as Instructor"}
                        control={<Switch size="small" checked={props.studentUser} onChange={props.handleStudentUser} />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Collapse in={!props.studentUser} timeout="auto" unmountOnExit>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          name="profile Link"
                          label="profile Link"
                          type="url"
                          id="profileLink"
                          inputRef={props.profileLinkRef}
                        />
                      </Collapse>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={props.handleSignUp}
                  >
                    Sign Up
          </Button>
                  <MessageAlert {...props.message} />
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        Already have an account? Sign in
              </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Container>
          </Container>
        );
      }
    }
  }

  export default SignUp;