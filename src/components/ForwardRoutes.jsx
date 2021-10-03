import React from "react";
import { Redirect, Route } from "react-router-dom";

function ForwardRoutes({ component: Component, ...restOfProps }) {
  const isNotAuthenticated = !(localStorage.getItem("authToken"))
  

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isNotAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ForwardRoutes;