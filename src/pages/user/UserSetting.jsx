import React, { useEffect, useState } from "react";
import axios from "axios";

function UserSetting(props) {
const [userInfo, setUserInfo] = useState({_id:''});
  useEffect(()=>{
    const config = {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  };
  axios
      .get("http://localhost:5000/users/retrieveInfo", config)
      .then((res) => {
        console.log(res)
          setUserInfo(res.data)
      })
      .catch((err) => console.log(err));
  }, ([userInfo]? [userInfo._id]: null));

  function handleOnClick(){
    console.log(userInfo)
  }

  function handleOnChange(e) {
    const name = e.target.name;
    const value =
      name === "coverImg"
        ? e.target.files[0]
        : e.target.value;

        setUserInfo((prevValue) => {
      return { ...prevValue, [name]: value };
    });

    console.log(name, value)
  }
  return (
    <>
    {userInfo ? 
      <section
      className="h-100 h-custom gradient-custom-2"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div
              className="card card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="p-5">
                      <h3 className="fw-normal mb-5">User Setting</h3>
                      <div className="circle-img img-circle mb-4 pb-6">
                        <img
                          src={userInfo.avatarUri}
                          className="rounded-circle"
                        />
                        <div className="col-md-6 mb-2 pb-2">
                            <div className="custom-file mb-3">
                              {/* <label
                                htmlFor="file"
                                className="custom-file-label"
                              >
                                {" "}
                                Choose Photo 1:
                              </label> */}
                              <input
                                type="file"
                                name="coverImg"
                                id="file"
                                onChange={handleOnChange}
                                className="custom-file-input"
                              />
                            </div>
                          </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-2 pb-2">
                          <div className="form-outline">
                            <label for="firstName">First Name</label>
                            <input
                              type="text"
                              id="firstName"
                              name="firstName"
                              className="form-control"
                              placeholder="Enter First Name"
                              value={userInfo.firstname}
                              onChange={handleOnChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-2 pb-2">
                          <div className="form-outline">
                            <label for="lastName">Last Name</label>
                            <input
                              type="text"
                              id="lastName"
                              name="lastName"
                              className="form-control"
                              placeholder="Enter Last Name"
                              onChange={handleOnChange}
                              value={userInfo.lastName}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 pb-2">
                        <div className="form-outline">
                          <label for="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter Email"
                            onChange={handleOnChange}
                            value={userInfo.email}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-2 pb-2">
                          <div className="form-outline">
                            <label for="noTel">No. Tel</label>
                            <input
                              type="number"
                              id="noTel"
                              name="noTel"
                              className="form-control"
                              onChange={handleOnChange}
                              value={userInfo.noTel}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-2 pb-2">
                          <div className="form-outline">
                            <label for="gender">Gender</label>
                            <select
                              name="gender"
                              id="gender"
                              className="form-control"
                            >
                              {/* <%var options = [ "Male", "Female", "Prefer Not to Say" ];
                              for ( var i = 0; i < options.length; i++ )
                              {
                                  var selected = ( user.gender == options[i] ) ? "selected" : "";
                                  %><option value="<%=options[ i ] %>" <%=selected %>><%=options[ i ] %></option><%
                              }
                              %> */}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-2 pb-2">
                          <div className="form-outline">
                            <label for="states">States</label>
                            <select
                              name="states"
                              id="states"
                              className="form-control"
                            >
                              {/* <%
                              var options = [ "Penang", "Johor" ];
                              for ( var i = 0; i < options.length; i++ )
                              {
                                  var selected = ( user.states == options[i] ) ? "selected" : "";
                                  %><option value="<%=options[ i ] %>" <%=selected %>><%=options[ i ] %></option><%
                              }
                              %>
                               */}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6 mb-2 pb-2">
                          <div className="form-outline">
                            <label for="location">Area Location</label>
                            <select
                              name="location"
                              id="location"
                              className="form-control"
                            >
                              {/* <%var options = [ "Simpang Ampat", "Butterworth" ];
                              for ( var i = 0; i < options.length; i++ )
                              {
                                  var selected = ( user.location == options[i]) ? "selected" : "";
                                  %><option value="<%=options[ i ] %>" <%=selected %>><%=options[ i ] %></option><%
                              }
                              %> */}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4 pb-2">
                        <div className="form-outline">
                          <label for="whatsappLink">Whatsapp Link: </label>
                          <input
                            type="text"
                            id="whatsappLink"
                            name="whatsappLink"
                            value="<%= (user.whatsappLink)? user.whatsappLink: '' %>"
                            className="form-control"
                            placeholder="Enter if you have one!"
                          />
                        </div>
                      </div>

                      <div className="mb-4 pb-2">
                        <div className="form-outline">
                          <label for="instagramLink">Instagram Link: </label>
                          <input
                            type="text"
                            id="instagramLink"
                            name="instagramLink"
                            value="<%= (user.instagramLink)? user.instagramLink: '' %>"
                            className="form-control"
                            placeholder="Enter link if you have one!"
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        onClick={handleOnClick}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-6 bg-indigo text-black">
                    <div className="p-5">
                      <h3 className="fw-normal mb-5">Change Password</h3>

                      <div className="mb-4 pb-2">
                        <div className="form-outline form-white">
                          <label for="oldPassword">Password</label>
                          <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            className="form-control"
                            placeholder="Enter Old Password"
                            value=""
                          />
                        </div>
                      </div>

                      <div className="mb-4 pb-2">
                        <div className="form-outline form-white">
                          <label for="newPassword1">New Password</label>
                          <input
                            type="password"
                            id="newPassword1"
                            name="newPassword1"
                            className="form-control"
                            placeholder="Enter New Password"
                            value=""
                          />
                        </div>
                      </div>

                      <div className="mb-4 pb-2">
                        <div className="form-outline form-white">
                          <label for="newPassword2">Confirm New Password</label>
                          <input
                            type="password"
                            id="newPassword2"
                            name="newPassword2"
                            className="form-control"
                            placeholder="Confirm Password"
                            value=""
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>: <></>}
    </>
  );
}

export default UserSetting;
