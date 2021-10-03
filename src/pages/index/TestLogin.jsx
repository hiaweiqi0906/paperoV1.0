import React, { useState } from "react";
import axios from "axios";
import {
  Redirect,
} from "react-router-dom";

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

    axios
      .post("http://localhost:5000/users/login", user, config)
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("authToken", res.data.authToken);
          window.location.pathname = "/";
          console.log("ok");
          setIsLoggedIn(true);
          setUser({ email: "", password: "" });
        } else {
          console.log("not ok", res.data);
          setIsLoggedIn(false);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleOnChange(e) {
    const { name, value } = e.target;

    setUser((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  return (
    <>
      <div className="container">
        <form  onSubmit={handleFormSubmit}>
          <div
            className="row register-form-style"
            
          >
            <div className="col-md-7 col-12">
              <div className="register-illu">
                <img
                  src="https://res.cloudinary.com/papero/image/upload/v1633151633/undraw_reading_time_gvg0_snfmbp.svg"
                  className="img-register"
                  alt="Papero Login"
                />
              </div>
            </div>
            <div className="col-md-5 col-12">
              <section id="register-form">
                <h2 className="ii-h2 ">Log In</h2>
                <div style={{ margin: "50px 0" }}>
                  <div className="row" style={{ marginBottom: "10px" }}>
                    <div className="col-md-12  col-12">
                      <label className="ii-h3" for="email">
                        Email:{" "}
                      </label>
                    </div>
                    <div className="col-md-12 col-12">
                      <input
                        style={{ width: "100%" }}
                        type="email"
                        onChange={handleOnChange}
                        value={user.email}
                      name="email"
                        id=""
                      />
                    </div>
                  </div>

                  <div className="row" style={{ marginBottom: "10px" }}>
                    <div className="col-md-12">
                      <label className="ii-h3" for="password">
                        Password:{" "}
                      </label>
                    </div>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type="password"
                        onChange={handleOnChange}
                        value={user.password}
                      name="password"
                        id=""
                      />
                    </div>
                  </div>
                                  </div>

                <button
                  type="submit"
                  className=" us-primary-btn"
                  style={{ width: "50%", display: "block", margin: "0 auto" }}
                >
                  Log In
                </button>
                <div style={{marginTop: '50px'}} className="row">
                  <div className="col-md-6">

                  <a href="/register">Register account!</a> 
                  </div>
                  <div className="col-md-6 text-align-fgt-pswd">

                  <a href="/resetPassword">Fotgot Password? </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default TestLogin;
