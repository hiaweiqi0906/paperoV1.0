import React from "react";
import axios from "axios";
import NavbarIndex from "../../components/NavbarIndex";

function TestRegister() {
  return (
    <div>
    <div className="container mt-5">
      <h1>Register</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <form action="/register" method="POST">
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                  />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card social-block">
            <div className="card-body">
              <a
                className="btn btn-block btn-social btn-google"
                href="/auth/google"
                role="button"
              >
                <i className="fab fa-google"></i>
                Sign Up with Google
              </a>
            </div>
            <div className="card-body">
              <a
                className="btn btn-block btn-social btn-facebook"
                href="/auth/facebook"
                role="button"
              >
                <i className="fab fa-facebook"></i>
                Sign Up with Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default TestRegister;
