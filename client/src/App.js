import React, { useState, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import PrivateRoute from "./Components/PrivateRoute";
import Navigation from "./Components/Navigation";
import CssBaseLine from "@material-ui/core/CssBaseline";
import isAuthenticated from "./utils/isAuthenticated";
import API from "./utils/API";

const App = () => {
  const [studentUser, setStudentUser] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
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
      userType: studentUser ? "student" : "instructor"
    }
    try {
      const response = await API.signUpUser(user);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  return (
    <React.Fragment>
      <CssBaseLine />
      <Navigation />
      <Switch>
      <Route
          exact path="/signup"
          render={(props =>
            <SignUp {...props}
              isLoggedIn={isLoggedIn}
              studentUser={studentUser}
              handleSignUp={handleSignUp}
              handleStudentUser={handleStudentUser} 
              fNameRef={fNameRef} lNameRef={lNameRef} emailRef={emailRef} passwordRef={passwordRef}/>)}
        />
        <PrivateRoute exact path="/" component={Home} />        
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
