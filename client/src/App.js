import React, { useState, useRef, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import SignUp from "./Components/SignUp";
import Home from "./pages/Home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import PrivateRoute from "./Components/PrivateRoute";
import CssBaseLine from "@material-ui/core/CssBaseline";
import isAuthenticated from "./utils/isAuthenticated";
import API from "./utils/API";

const App = () => {
  const [studentUser, setStudentUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [message, setMessage] = useState();
  const fNameRef = useRef("");
  const lNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleStudentUser = event => {
    setStudentUser(event.target.checked);
  }
  const handleSignUp = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const user = {
      firstName: fNameRef.current.value.trim(),
      lastName: lNameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      password: passwordRef.current.value,
      student: studentUser,
      instructor: !studentUser
    }
    try {
      const response = await API.signUpUser(user);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        setStudentUser(response.data.student);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  const handleLogin = async event => {
    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await API.login({
        email: emailRef.current.value.trim(),
        password: passwordRef.current.value
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        setStudentUser(response.data.student);
      }
      else {
        console.log(response);
      }
    } catch (error) {
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
      <Switch>
        <Route
          exact path="/signup"
          render={(props =>
            <SignUp {...props}
              isLoggedIn={isLoggedIn}
              studentUser={studentUser}
              handleSignUp={handleSignUp}
              handleStudentUser={handleStudentUser}
              fNameRef={fNameRef} lNameRef={lNameRef} emailRef={emailRef} passwordRef={passwordRef} />)}
        />
        <Route exact path="/login"
          render={(props =>
            <Login {...props}
              isLoggedIn={isLoggedIn}
              handleLogin={handleLogin}
              emailRef={emailRef} passwordRef={passwordRef}
              error={message} />)}
        />
        <PrivateRoute
          path="/"
          handleLogout={handleLogout}
          component={Home}
          studentUser={studentUser}
        />
        <Route exact path="/logout"
          render={(props =>
            <Logout {...props}
              handleLogout={handleLogout} />)}
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;
