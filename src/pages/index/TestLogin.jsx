import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import CheckAuth from "../../components/CheckAuth";

function TestLogin() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    // axios({
    //     method: "POST",
    //     data: user,
    //     withCredentials: true,
    //     url: "http://localhost:5000/login",
    //   }).then((res) => {
    //     setIsLoggedIn(true)
    //     console.log(res)});

    axios
      .post("http://localhost:5000/users/login", user, config)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("authToken", res.data.authToken);
          window.location.pathname = "/";
          console.log("ok");
          setIsLoggedIn(true);
        } else {
          console.log("not ok", res.data);
          setIsLoggedIn(false);
        }
      })
      .catch((err) => console.log(err));
    setUser({ email: "", password: "" });
  }

  // function handleGoogleAuth(){
  // axios
  //     .get("http://localhost:5000//auth/google", config)
  //     .then((res) => {
  //       if (res.status === 200) {
  //           console.log('ok')
  //           setIsLoggedIn(true)
  //           CheckAuth.login()
  //           console.log(CheckAuth.isAuthenticated())
  //       }else{
  //         console.log('not ok', res.data)
  //           setIsLoggedIn(false)
  //       }
  //     })
  //     .catch((err) => console.log(err));

  //   setUser({ email: "", password: "" });
  // }

  function handleOnChange(e) {
    const { name, value } = e.target;

    setUser((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  return (
    <div className="container mt-5">
      {isLoggedIn && <Redirect to="/" />}
      <h1>Login</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={handleOnChange}
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={handleOnChange}
                    name="password"
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card">
            <div className="card-body">
              <a
                className="btn btn-block btn-social btn-google"
                href="/auth/google"
                role="button"
              >
                <i className="fab fa-google"></i>
                Sign In with Google
              </a>
            </div>
            <div className="card-body">
              <a
                className="btn btn-block btn-social btn-facebook"
                href="/auth/facebook"
                role="button"
              >
                <i className="fab fa-facebook"></i>
                Sign In with Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestLogin;
