import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UploadBook from "./UploadBook";
import UserSetting from "./UserSetting";
import axios from "axios";

function UserPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  let userInfo;

  useEffect(() => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .get("http://localhost:5000/users/checkIsLoggedIn", config)
      .then((res) => {
        if (res.data.statusCode === '200') {
          userInfo = (res.data.user)
          console.log(userInfo)
          setIsLoggedIn(true);
        } else if(res.data.statusCode === '401'){
          localStorage.clear()
          window.location.pathname = "/"
          setIsLoggedIn(false);
        }
      })
      .catch((err) => console.log(err));
  });

  return (
    <Router>
      {isLoggedIn ? (
        <Switch>
          <Route path="/user/upload">
            <UploadBook userInfo={userInfo} />
          </Route>
          <Route path="/user/setting">
            <UserSetting userInfo={userInfo} />
          </Route>
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      ) : <div style={{height:"500px"}}></div>}
    </Router>
  );
}

export default UserPage;
