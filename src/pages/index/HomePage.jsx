import React from "react";
import NavbarIndex from "../../components/NavbarIndex";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import TestLogin from "./TestLogin";
import TestRegister from "./TestRegister";

function HomePage() {
  return (
    <Router>
      

      <div>
        <Switch>
          <Route path="/login">
            <TestLogin />
          </Route>
          <Route path="/register">
            <TestRegister />
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default HomePage;
