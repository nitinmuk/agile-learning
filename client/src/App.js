import React, { useState, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from "./components/Header";
import "./App.css";
import SignUp from "./components/SignUp";
import Home from "./pages/Home";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import CssBaseLine from "@material-ui/core/CssBaseline";
import isAuthenticated from "./utils/isAuthenticated";
import API from "./utils/API";
import Footer from './components/Footer';

const App = () => {
  const [studentUser, setStudentUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [message, setMessage] = useState();
  const [appStatus, setAppStatus] = useState("init");
  const fNameRef = useRef("");
  const lNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const profileLinkRef = useRef("");
  /**
   * calls getUser API to initialize studentUser
   */
  const initStudentUser = async () => {
    try {
      const response = await API.getUser();
      setStudentUser(response.data.student);
    } catch (error) {
      console.log(error);
    }
  }
  if (isLoggedIn) {
    initStudentUser();
  }
  /**
   * setting studentUser based on user selection during sign up
   * @param {switch event} event 
   */
  const handleStudentUser = event => {
    setStudentUser(event.target.checked);
  }
  /**
   * handles signup event by calling signUpUser API
   * @param {signup submit} event 
   */
  const handleSignUp = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const user = {
      firstName: fNameRef.current.value.trim(),
      lastName: lNameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value,
      student: studentUser,
      instructor: !studentUser,
      profileLink: profileLinkRef.current.value
    }
    try {
      setAppStatus("processing");
      const response = await API.signUpUser(user);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        setStudentUser(response.data.student);
        setAppStatus("init");
      }
    } catch (error) {
      console.log("Error", error);
      setMessage({
        message: "OOPs, something went wrong, please try again.",
        severity:"error"
      });
      setAppStatus("error");
    }
  }
  /**
   * handles event about user submitting login request
   * if login is successful then store jwt token in local storage
   * @TODO: move jwt token to react state from local storage
   * @param {login event} event 
   */
  const handleLogin = async event => {
    event.preventDefault();
    event.stopPropagation();
    try {
      setAppStatus("processing");
      const response = await API.login({
        email: emailRef.current.value.trim(),
        password: passwordRef.current.value
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        setStudentUser(response.data.student);
        setAppStatus("init");
      }
      else {
        console.log(response);
        setAppStatus("error");
        setMessage({ message: "Invalid Email or password", severity: "error" });
      }
    } catch (error) {
      console.log("Error", error);
      setAppStatus("error");
      setMessage({ message: "Invalid Email or password", severity: "error" });
    }
    finally {
      if (emailRef.current) {
        emailRef.current.value = "";
      }
      if (passwordRef.current) {
        passwordRef.current.value = "";
      }
    }
  }
  /**
   * handler to logout user 
   * @param {event} event 
   */
  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }
  return (
    <React.Fragment>
      <CssBaseLine />
      <Header relevantLinks={getRelevantLinks()} />
      <Switch>
        <Route
          exact path="/signup"
          render={(props =>
            <SignUp {...props}
              isLoggedIn={isLoggedIn}
              studentUser={studentUser}
              handleSignUp={handleSignUp}
              handleStudentUser={handleStudentUser}
              fNameRef={fNameRef} lNameRef={lNameRef} emailRef={emailRef} passwordRef={passwordRef} profileLinkRef={profileLinkRef} 
              message={message}
              appStatus={appStatus}/>)}
        />
        <Route path="/login"
          render={(props =>
            <Login {...props}
              isLoggedIn={isLoggedIn}
              handleLogin={handleLogin}
              emailRef={emailRef} passwordRef={passwordRef}
              message={message}
              appStatus={appStatus} />)}
        />
        <PrivateRoute
          path="/"
          handleLogout={handleLogout}
          component={Home}
          studentUser={studentUser}
        />
      </Switch>
      <Footer />
    </React.Fragment>
  );
  function getRelevantLinks() {
    if (isLoggedIn) {
      if (studentUser) {
        return ["home", "subscribedStories", "availableStories", "logOut"];
      } else {
        return ["home", "createLearningStory", "reviewLearningStory", "logOut"];
      }
    }
    else {
      return ["logIn"];
    }

  }
}

export default App;
