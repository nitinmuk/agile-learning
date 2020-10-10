import React from "react";
import { Route, Switch } from 'react-router-dom';
import "./App.css";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import PrivateRoute from "./Components/PrivateRoute";
import Navigation from "./Components/Navigation";

import CssBaseLine from "@material-ui/core/CssBaseline";

const App = () => {
  return (
    <React.Fragment>
      <CssBaseLine />
      <Navigation/>
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
