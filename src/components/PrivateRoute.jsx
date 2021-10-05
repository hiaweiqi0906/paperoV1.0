import React from "react";
import { Redirect, Route, useLocation } from "react-router-dom";
import axios from "axios";

async function PrivateRoute(props) {
  const location = useLocation();
  return await axios
    .get("https://papero-dev.herokuapp.com/testLogin", {
      withCredentials: true,
    })
    .then((res) => {
      const authLogin = res.data.msg === "ok";
      return authLogin ? (
        <Route {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      );
    });
}

export default PrivateRoute;
