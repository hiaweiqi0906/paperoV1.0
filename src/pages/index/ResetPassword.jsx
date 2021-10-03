import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PasswordResetIllustration from "../shop/PasswordResetIllustration";


function ResetPassword() {
  const { userId, token } = useParams();
  const [userInfo, setUserInfo] = useState({ password: "" });
  const [successful, setSuccessful] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);

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
      .post(
        `http://localhost:5000/users/resetPassword/${userId}/${token}`,
        userInfo,
        config
      )
      .then((res) => {
        setErrorOccured(false);
        setSuccessful(true);
      })
      .catch((err) => {
        setSuccessful(false);
        setErrorOccured(true);
        console.log(err);
      });
  }
  return (
    <div>
        {successful ? (
          <PasswordResetIllustration />
        ) : (
          <div className="container">
          <form onSubmit={onSubmit}>
            <div className="row register-form-style">
              <div className="col-md-7 col-12">
                <div className="register-illu">
                  <img
                    src="https://res.cloudinary.com/papero/image/upload/v1633152484/undraw_Forgot_password_re_hxwm_r5nxhh.svg"
                    className="img-register"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-md-5 col-12">
                <section id="register-form">
                  <h2 className="ii-h2 ">Reset Password</h2>
                  <div style={{ margin: "50px 0" }}>
                    <div className="row" style={{ marginBottom: "10px" }}>
                      <div className="col-md-12  col-12">
                        <label className="ii-h3" for="email">
                          New Password:{" "}
                        </label>
                      </div>
                      <div className="col-md-12 col-12">
                        <input
                          style={{ width: "100%" }}
                          type="password"
                          onChange={onChange}
                          value={userInfo.password}
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
                    Reset
                  </button>
                </section>
              </div>
            </div>
          </form>
        </div>
        )}
        {errorOccured && <h1>Something's Wrong</h1>}
      </div>

  );
}

export default ResetPassword;
