import React, { useState } from "react";
import axios from "axios";

function TestRegister() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    password2: "",
    firstName: "",
    lastName: "",
  });

  const [errorMsg, setErrorMsg] = useState([]);
  function onChange(e) {
    const { name, value } = e.target;
    setUserInfo((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:5000/users/register", userInfo, config)
      .then((res) => {
        if (res.status === 200) {
          window.location.pathname = "/login";
          console.log("ok");
          setUserInfo({
            email: "",
            password: "",
            password2: "",
            firstName: "",
            lastName: "",
          });
        } else {
          console.log("not ok", res.data);
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <div className="container">
        <form onSubmit={onSubmit}>
          <div className="row register-form-style">
            <div className="col-md-7 col-12">
              <div className="register-illu">
                <img
                  src="https://res.cloudinary.com/papero/image/upload/v1633151633/undraw_reading_time_gvg0_snfmbp.svg"
                  className="img-register"
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-5 col-12">
              <section id="register-form">
                <h2 className="ii-h2 ">Register</h2>
                <div style={{ margin: "50px 0" }}>
                  <div className="row" style={{ marginBottom: "10px" }}>
                    <div className="col-md-12  col-12">
                      <label className="ii-h3" for="email">
                        Email*:{" "}
                      </label>
                    </div>
                    <div className="col-md-12 col-12">
                      <input
                        style={{ width: "100%" }}
                        type="email"
                        name="email"
                        required
                        id=""
                        onChange={onChange}
                        value={userInfo.email}
                      />
                    </div>
                  </div>
                  <div className="row" style={{ marginBottom: "10px" }}>
                    <div
                      className="col-md-6 col-12"
                      style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    >
                      <div className="row">
                        <div className="col-md-12 col-12">
                          <label className="ii-h3" for="password">
                            First Name*:{" "}
                          </label>
                        </div>
                        <div className="col-md-12 col-12">
                          <input
                            style={{ width: "100%" }}
                            type="text"
                        required
                        name="firstName"
                            id=""
                            onChange={onChange}
                            value={userInfo.firstName}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-6 col-12"
                      style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    >
                      <div className="row">
                        <div className="col-md-12 col-12">
                          <label className="ii-h3" for="password">
                            Last Name*:{" "}
                          </label>
                        </div>
                        <div className="col-md-12 col-12">
                          <input
                        required
                        style={{ width: "100%" }}
                            type="text"
                            name="lastName"
                            onChange={onChange}
                            value={userInfo.lastName}
                            id=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row" style={{ marginBottom: "10px" }}>
                    <div className="col-md-12">
                      <label className="ii-h3" for="password">
                        Password*:{" "}
                      </label>
                    </div>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        type="password"
                        required
                        name="password"
                        onChange={onChange}
                        value={userInfo.password}
                        id=""
                      />
                    </div>
                  </div>
                  <div className="row" style={{ marginBottom: "10px" }}>
                    <div className="col-md-12">
                      <label className="ii-h3" for="password">
                        Re-enter Password*:{" "}
                      </label>
                    </div>
                    <div className="col-md-12">
                      <input
                        style={{ width: "100%" }}
                        required
                        type="password"
                        name="password2"
                        onChange={onChange}
                        value={userInfo.password2}
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
                  Register
                </button>
                <div style={{ marginTop: "50px" }} className="row">
                  <div className="col-md-6">
                    <a href="/login">Log In? Click Here!</a>
                  </div>
                  <div className="col-md-6 text-align-fgt-pswd">
                    <a href="/resetPassword">Forgot Password? </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TestRegister;
