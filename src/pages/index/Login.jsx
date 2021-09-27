import React, { useState } from "react";
import TitleHeading from "../../components/TitleHeading";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import axios from "axios";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleFormSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/user/login", user)
      .then((res) => {
        if (res.status === 200) {
          setIsLoggedIn(true);
          return <Redirect to="../register" />;
        }
      })
      .catch((err) => console.log(err));

    setUser({ email: "", password: "" });
  }

  function handleOnChange(e) {
    const { name, value } = e.target;

    setUser((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  return (
    <div>
      {isLoggedIn && <Redirect to="/" />}
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <TitleHeading title="Log in" />

                      <form
                        className="mx-1 mx-md-4"
                        action="/users/login"
                        onSubmit={handleFormSubmit}
                        method="POST"
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              onChange={handleOnChange}
                              value={user.email}
                              id="email"
                              name="email"
                              className="form-control"
                              placeholder="Your Email"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              onChange={handleOnChange}
                              id="password"
                              value={user.password}
                              name="password"
                              className="form-control"
                              placeholder="Your Password"
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                            style={{ backgroundColor: "darkred" }}
                          >
                            Log in
                          </button>
                        </div>

                        <p className="lead mt-4">
                          No Account? <a href="/users/register">Register</a>
                        </p>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="http://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
