import React, { useEffect, useState } from "react";
import axios from "axios";
import StatesSelect from "../../components/StatesSelect";
import AreaSelect from "../../components/AreaSelect";

function UserSetting(props) {
  let statesChoice;
  let areaLocationsChoice;
  const [userInfo, setUserInfo] = useState({
    _id: "",
    firstName: "",
    coverImg: "",
    lastName: "",
    email: "",
    gender: "",
    noTel: "",
    states: "",
    areaLocations: "",
    whatsappLink: "",
    messengerLink: "",
    wechatLink: "",
    instagramLink: "",
  });
  const [password, setPassword] = useState({oldPassword: '', newPassword1: '', newPassword2: ''});
  const [error, setError] = useState("");

  function handleChangeSelect(name, value, statesChoices) {
    if (name === "states") statesChoice = statesChoices;
    else if (name === "areaLocations") areaLocationsChoice = statesChoices;

    setUserInfo((prevValue) => {
      return { ...prevValue, [name]: value };
    });
    console.log(userInfo);
  }

  function checkPassword(e){
    if (!password.oldPassword || !password.newPassword1 || !password.newPassword2){
      setError('Please Enter All Required Fields')
      return false
    }else if(password.newPassword1 !== password.newPassword2){
      setError('New Passwords Does Not Matched')
      return false
    }
    return true
  }

  function handleOnSubmitPassword(e){
    e.preventDefault()

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:5000/users/changePassword", password, config)
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
        } else {
          console.log("not ok", res.data);
        }
      })
      .catch((err) => console.log(err));
    // changePassword
  }

  function handleOnChangePassword(e) {
    const { name, value } = e.target;
    setPassword((prevPassword) => {
      return { ...prevPassword, [name]: value };
    });
  }

  useEffect(() => {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://localhost:5000/users/retrieveInfo", config)
      .then((res) => {
        console.log("ok");
        console.log(res.data);
        setUserInfo({ ...res.data, areaLocations: res.data.location });
      })
      .catch((err) => console.log(err));
  }, [userInfo._id]);

  function checkNoEmpty() {
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.email ||
      !userInfo.gender ||
      !userInfo.noTel ||
      !userInfo.states ||
      !userInfo.areaLocations
    ) {
      console.log('somethings wrong', userInfo.firstName ,userInfo.lastName ,userInfo.email,userInfo.gender,userInfo.noTel,userInfo.states,userInfo.areaLocations)
      setError("Please Enter All Required Fields! ");
      return false;
    }
    return true;
  }

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    if (checkNoEmpty()) {
      try {
        let formData = new FormData();
        formData.append("coverImg", userInfo.coverImg);
        formData.append("firstName", userInfo.firstName);
        formData.append("lastName", userInfo.lastName);
        formData.append("email", userInfo.email);
        formData.append("gender", userInfo.gender);
        formData.append("noTel", userInfo.noTel);
        formData.append("states", userInfo.states);
        formData.append("location", userInfo.areaLocations);
        formData.append("whatsappLink", userInfo.whatsappLink);
        formData.append("messengerLink", userInfo.messengerLink);
        formData.append("wechatLink", userInfo.wechatLink);
        formData.append("instagramLink", userInfo.instagramLink);
        console.log(userInfo);

        const res = await fetch("http://localhost:5000/sellers/test", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
        let data = await res.json();
        if (res.ok) {
          if (data.msg !== "Updated") {
            setError(data.msg);
          } else {
            window.location.pathname = "/";
          }
          // console.log(data)
          // handle data

          // setData({
          //   coverImg: "",
          //   img1: "",
          //   img2: "",
          //   title: "",
          //   price: "",
          //   description: "",
          //   categories: "",
          //   uploadedBy: "",
          //   publishingCompany: "",
          //   language: "",
          //   isbn: 0,
          //   coverType: "",
          //   year: "",
          //   quantity: 1,
          //   states: "",
          //   location: "",
          //   contactNumber: "",
          //   whatsappLink: "",
          //   messengerLink: "",
          //   wechatLink: "",
          //   instagramLink: "",
          // });
          // setIsNotPosted(false);
          // window.location.pathname = "/";
        } else {
          console.log("not ok");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  function handleOnChange(e) {
    const name = e.target.name;
    const value = name === "coverImg" ? e.target.files[0] : e.target.value;

    setUserInfo((prevValue) => {
      return { ...prevValue, [name]: value };
    });

    console.log(userInfo);
  }
  
  return (
    <>
      {userInfo ? (
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
                  {error !== "" && <p>{error}</p>}
                  <div className="card-body p-0">
                    <div className="row g-0">
                      <div className="col-lg-6">
                        <div className="p-5">
                          <h3 className="fw-normal mb-5">User Setting</h3>
                          <form
                            encType="multipart/form-data"
                            onSubmit={handleSubmitInfo}
                          >
                            <div className="circle-img img-circle mb-4 pb-6">
                              <img
                                style={{ width: "100px", height: "100px" }}
                                src={userInfo.avatarUri}
                                className="rounded-circle"
                              />
                              <div className="col-md-6 mb-2 pb-2">
                                <div className="custom-file mb-3">
                                  <label
                                    htmlFor="coverImg"
                                    className="custom-file-label"
                                  >
                                    {" "}
                                    Choose Photo 1:
                                  </label>
                                  <input
                                    type="file"
                                    name="coverImg"
                                    id="coverImg"
                                    onChange={handleOnChange}
                                    className="custom-file-input"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6 mb-2 pb-2">
                                <div className="form-outline">
                                  <label htmlFor="firstName">First Name</label>
                                  <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="form-control"
                                    placeholder="Enter First Name"
                                    value={
                                      userInfo.firstName
                                        ? userInfo.firstName
                                        : ""
                                    }
                                    onChange={handleOnChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 mb-2 pb-2">
                                <div className="form-outline">
                                  <label htmlFor="lastName">Last Name</label>
                                  <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="form-control"
                                    placeholder="Enter Last Name"
                                    onChange={handleOnChange}
                                    value={
                                      userInfo.lastName ? userInfo.lastName : ""
                                    }
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div className="form-outline">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  className="form-control"
                                  placeholder="Enter Email"
                                  onChange={handleOnChange}
                                  value={userInfo.email ? userInfo.email : ""}
                                />
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6 mb-2 pb-2">
                                <div className="form-outline">
                                  <label htmlFor="noTel">No. Tel</label>
                                  <input
                                    type="number"
                                    id="noTel"
                                    name="noTel"
                                    className="form-control"
                                    onChange={handleOnChange}
                                    value={userInfo.noTel ? userInfo.noTel : ""}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6 mb-2 pb-2">
                                <div className="form-outline">
                                  <label htmlFor="gender">Gender</label>
                                  <select
                                    name="gender"
                                    id="gender"
                                    className="form-control"
                                    onChange={handleOnChange}
                                  >
                                    {/* <%var options = [ "Male", "Female", "Prefer Not to Say" ];
                              for ( var i = 0; i < options.length; i++ )
                              {
                                  var selected = ( user.gender == options[i] ) ? "selected" : "";
                                  %><option value="<%=options[ i ] %>" <%=selected %>><%=options[ i ] %></option><%
                              }
                              %> */}
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-6 mb-2 pb-2">
                                <div className="form-outline">
                                  <StatesSelect onChange={handleChangeSelect} states = {userInfo.states}/>
                                  {/* <label htmlFor="states">States</label> */}
                                  {/* <select
                                    name="states"
                                    id="states"
                                    className="form-control"
                                    onChange={handleOnChange}
                                  >
                                    <option value="P. Pinang">P. Pinang</option>
                                    <option value="K. Lumpur">K. Lumpur</option>
                                    {/* <%
                              var options = [ "Penang", "Johor" ];
                              for ( var i = 0; i < options.length; i++ )
                              {
                                  var selected = ( user.states == options[i] ) ? "selected" : "";
                                  %><option value="<%=options[ i ] %>" <%=selected %>><%=options[ i ] %></option><%
                              }
                              %>
                               
                                  </select> */}
                                </div>
                              </div>
                              <div className="col-md-6 mb-2 pb-2">
                                <div className="form-outline">
                                  <AreaSelect states = {userInfo.states} userAreaLocation={userInfo.areaLocations} onChange={handleChangeSelect} />
                                  {/* <label htmlFor="location">
                                    Area Location
                                  </label>
                                  <select
                                    name="location"
                                    id="location"
                                    className="form-control"
                                    onChange={handleOnChange}
                                  >
                                    <option value="Alma">Alma</option>
                                    <option value="BTM">BTM</option>
                                    {/* <%var options = [ "Simpang Ampat", "Butterworth" ];
                              for ( var i = 0; i < options.length; i++ )
                              {
                                  var selected = ( user.location == options[i]) ? "selected" : "";
                                  %><option value="<%=options[ i ] %>" <%=selected %>><%=options[ i ] %></option><%
                              }
                              %> 
                                  </select> */}
                                </div>
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div className="form-outline">
                                <label htmlFor="whatsappLink">
                                  Whatsapp Link:{" "}
                                </label>
                                <input
                                  type="text"
                                  id="whatsappLink"
                                  name="whatsappLink"
                                  onChange={handleOnChange}
                                  value={
                                    userInfo.whatsappLink
                                      ? userInfo.whatsappLink
                                      : ""
                                  }
                                  className="form-control"
                                  placeholder="Enter if you have one!"
                                />
                              </div>
                            </div>
                            <div className="mb-4 pb-2">
                              <div className="form-outline">
                                <label htmlFor="instagramLink">
                                  Instagram Link:{" "}
                                </label>
                                <input
                                  type="text"
                                  id="instagramLink"
                                  name="instagramLink"
                                  onChange={handleOnChange}
                                  value={
                                    userInfo.instagramLink
                                      ? userInfo.instagramLink
                                      : ""
                                  }
                                  className="form-control"
                                  placeholder="Enter if you have one!"
                                />
                              </div>
                            </div>
                            <div className="mb-4 pb-2">
                              <div className="form-outline">
                                <label htmlFor="messengerLink">
                                  Messenger Link:{" "}
                                </label>
                                <input
                                  type="text"
                                  id="messengerLink"
                                  name="messengerLink"
                                  onChange={handleOnChange}
                                  value={
                                    userInfo.messengerLink
                                      ? userInfo.messengerLink
                                      : ""
                                  }
                                  className="form-control"
                                  placeholder="Enter if you have one!"
                                />
                              </div>
                            </div>
                            <div className="mb-4 pb-2">
                              <div className="form-outline">
                                <label htmlFor="wechatLink">
                                  Wechat Link:{" "}
                                </label>
                                <input
                                  type="text"
                                  id="wechatLink"
                                  onChange={handleOnChange}
                                  name="wechatLink"
                                  value={
                                    userInfo.wechatLink
                                      ? userInfo.wechatLink
                                      : ""
                                  }
                                  className="form-control"
                                  placeholder="Enter link if you have one!"
                                />
                              </div>
                            </div>
                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                              // onClick={handleOnClick}
                            >
                              Update
                            </button>
                          </form>
                        </div>
                      </div>
                      <div className="col-lg-6 bg-indigo text-black">
                        <div className="p-5">
                          <form encType="multipart/form-data" onSubmit={handleOnSubmitPassword}>
                            <h3 className="fw-normal mb-5">Change Password</h3>

                            <div className="mb-4 pb-2">
                              <div className="form-outline form-white">
                                <label htmlFor="oldPassword">Password</label>
                                <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            className="form-control"
                            placeholder="Enter Old Password"
                            onChange={handleOnChangePassword}

                            value={password.oldPassword}
                          />
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div className="form-outline form-white">
                                <label htmlFor="newPassword1">
                                  New Password
                                </label>
                                <input
                            type="password"
                            id="newPassword1"
                            name="newPassword1"
                            className="form-control"
                            onChange={handleOnChangePassword}
                            placeholder="Enter New Password"
                            value={password.newPassword1}
                          />
                              </div>
                            </div>

                            <div className="mb-4 pb-2">
                              <div className="form-outline form-white">
                                <label htmlFor="newPassword2">
                                  Confirm New Password
                                </label>
                                <input
                            type="password"
                            id="newPassword2"
                            name="newPassword2"
                            className="form-control"
                            onChange={handleOnChangePassword}
                            placeholder="Confirm Password"
                            value={password.newPassword2}
                          />
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              Change Password
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}

export default UserSetting;
