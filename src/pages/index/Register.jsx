import React, { Component } from 'react';
import TitleHeading from '../../components/TitleHeading'

function Register(){
    return(<section className="h-100" style={{backgroundColor: "#eee", overflow: "hidden"}}>
    <div className="container py-5 h-100" >
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col">
          <div className="card card-registration my-4" style={{ borderRadius: "25px" }}>
            <div className="row g-0">
              <div className="col-xl-6 d-none d-xl-block">
                <img
                  src=""
                  alt="Sample photo"
                  className="img-fluid"
                  style={{borderTopLeftRadius: ".25rem", borderBottomLeftRadius: ".25rem"}}
                />
              </div>
              <div className="col-xl-6">
                <div className="card-body p-md-5 text-black">
                <TitleHeading title="User Register" />
                  <form action="/users/register" method="POST">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="text" id="first_name" name="first_name" className="form-control"
                            placeholder="Enter First Name"
                            value="" />
                          <label for="first_name">First Name</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="text" id="last_name" name="last_name" className="form-control"
                            placeholder="Enter Last Name"
                            value="" />
                          <label for="last_name">Last Name</label>
                        </div>
                      </div>
                    </div>
                    <div className="form-outline mb-4">
                      <input type="email" id="email" name="email" className="form-control" placeholder="Enter Email"
                        value="" />
                      <label for="email">Email Address</label>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input type="password" id="password" name="password" className="form-control"
                            placeholder="Create Password"
                            value="" />
                          <label for="password">Password</label>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <select name="gender" id="gender" className="form-control">
                            <option value="none" selected disabled hidden>
                              Select a Gender
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="not_to_say">Prefer Not To Say</option>
                          </select>
                          <label for="gender">Gender</label>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="password" id="password2" name="password2" className="form-control"
                          placeholder="Confirm Password"
                          value="" />
                        <label for="password2">Confirm Password</label>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <select name="states" id="states" className="form-control">
                        <option value="none" selected disabled hidden>
                          Select a States
                        </option>
                        <option value="Penang">Penang</option>
                      </select>
                      <label for="states">States</label>
                    </div>

                    <div className="form-outline mb-4">
                      <select name="location" id="location" className="form-control">
                        <option value="none" selected disabled hidden>
                          Select an Area Location
                        </option>
                        <option value="Simpang Ampat">Simpang Ampat</option>
                        <option value="Butterworth">Butterworth</option>
                      </select>
                      <label for="location">Area Location</label>
                    </div>
                    <div className="d-flex justify-content-end pt-3">
                      <button type="submit" className="btn btn-warning btn-lg ms-2">Submit</button>
                    </div>
                    </form></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>)

}

export default Register

function TitleH3() {
    return <h3 className="mb-5 text-uppercase">User Register</h3>;
}
