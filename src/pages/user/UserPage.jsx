import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UploadBook from "./UploadBook";
import UserSetting from "./UserSetting";
import UserFavourite from "./UserFavourite";
import UserInfo from "./UserInfo";
import EditOneBook from "./EditOneBook";
import OtherUserInfo from "./OtherUserInfo";
import LoadingIllustration from "../shop/LoadingIllustration";
import axios from "axios";

function UserPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  let userInfo;

  useEffect(() => {
    const authToken = localStorage.getItem("authToken") || "empty";
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };

    axios
      .get("https://papero-dev.herokuapp.com/users/checkIsLoggedIn", config)
      .then((res) => {
        if (res.status === 200) {
          userInfo = res.data.user;
          setIsLoggedIn(true);
        } else if (res.data.statusCode === "401") {
          localStorage.clear();
          window.location.pathname = "/";
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
          <Route path="/user/favourite">
            <UserFavourite userInfo={userInfo} />
          </Route>
          <Route exact path="/user/info">
            <UserInfo userInfo={userInfo} />
          </Route>
          <Route exact path="/user/edit/:bookId">
            <EditOneBook userInfo={userInfo} />
          </Route>

          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      ) : (
        <div style={{ height: "500px", marginTop: "100px" }}>
          <LoadingIllustration />
        </div>
      )}
    </Router>
  );
}

export default UserPage;
