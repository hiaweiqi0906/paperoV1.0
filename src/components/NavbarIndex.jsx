import React, { useState } from "react";
import axios from "axios";

function NavbarIndex(props) {
  const [query, setQuery] = useState("");
  const [hiddenStyle, setHiddenStyle] = useState({ display: "none" });
  const authToken = localStorage.getItem("authToken") || "empty";
  let isAuthenticated = localStorage.getItem("authToken");
  let userInfo;
  if (isAuthenticated) {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    };
    axios
      .get("http://localhost:5000/users/checkIsLoggedIn", config)
      .then((res) => {
        if (res.status === 200) {
        } else if (res.status === 400) {
          localStorage.clear();
          window.location.pathname = "/";
          isAuthenticated = false;
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLogOut() {
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .get("http://localhost:5000/users/logout", config)
      .then((res) => {
        localStorage.clear();
        isAuthenticated = false;
        window.location.pathname = "/";
      })
      .catch((err) => console.log(err));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    // props.handleOnSubmit()
    props.onSearch(query);
    setQuery("");
  }

  function showHiddenMenu() {
    if (hiddenStyle.display === "none") setHiddenStyle({ display: "block" });
    else setHiddenStyle({ display: "none" });
  }
  function handleOnChange(e) {
    const value = e.target.value;
    setQuery(value);
  }
  return (
    <>
      <section id="navbar">
        {isAuthenticated ? (
          <>
            <div className="navbar-bg navbar-desktop">
              <div className="row" style={{ height: "64px" }}>
                <div className="col-2 navbar-center-align">
                  <a
                    href="/"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="row">
                      <div className="col-3" style={{ marginRight: "10px" }}>
                        <img
                          className="nav-logo-svg"
                          src="https://res.cloudinary.com/papero/image/upload/v1632813716/papero_duew3b.svg"
                          alt=""
                        />
                      </div>
                      <div className="col-7 navbar-center-align">
                        <h1 className="nav-logo-h1">PAPERO</h1>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="col-7 navbar-center-align">
                  <form onSubmit={handleOnSubmit}>
                    <div
                      className="row search-area"
                      style={{ width: "80%", margin: "0px auto" }}
                    >
                      <div className="col-11">
                        <div>
                          <input
                            type="text"
                            className="search-area-text-input"
                            onChange={handleOnChange}
                            name="searchbar"
                            value={query}
                            id="searchbar"
                            style={{
                              width: "100%",
                              border: "none",
                              borderColor: "transparent",
                              height: "40px",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-1" style={{ margin: "auto" }}>
                        <button
                          type="submit"
                          style={{
                            backgroundColor: "transparent",
                            backgroundRepeat: "no-repeat",
                            cursor: "pointer",
                            overflow: "hidden",
                            outline: "none",
                            border: "none",
                          }}
                        >
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="col-3 navbar-center-align">
                  <a
                    className="navbar-link navbar-upload-book"
                    href="/user/upload"
                  >
                    <i className="fas fa-book"></i> Upload Book
                  </a>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-secondary dropdown-toggle btn-transparent-bg"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Menu <i className="far fa-user-circle"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="/user/setting">
                          Setting
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/user/info">
                          My Books
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/user/favourite">
                          Favourites
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" onClick={handleLogOut}>
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar-bg navbar-mobile" style={{ height: "auto" }}>
              <div className="row" style={{ height: "64px" }}>
                <div className="col-md-9 col-9 navbar-center-align">
                  <a
                    href="/"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="row">
                      <div
                        className="col-md-3 col-3"
                        style={{ marginRight: "10px" }}
                      >
                        <img
                          className="nav-logo-svg"
                          src="https://res.cloudinary.com/papero/image/upload/v1632813716/papero_duew3b.svg"
                          alt="Papero Logo"
                        />
                      </div>
                      <div className="col-md-7 col-7 navbar-center-align">
                        <h1 className="nav-logo-h1">PAPERO</h1>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className="col-3"
                  style={{
                    margin: "auto",
                    paddingRight: "10px",
                    textAlign: "right",
                  }}
                >
                  <a
                    className="icon"
                    style={{ color: "white" }}
                    onClick={showHiddenMenu}
                  >
                    <i className="fa fa-bars"></i>
                  </a>
                </div>
              </div>

              <div className="hidden-menu" id="myLinks" style={hiddenStyle}>
                <div className="col-12 navbar-center-align">
                  <form action="">
                    <div
                      className="row search-area"
                      style={{ width: "80%", margin: "0px auto" }}
                    >
                      <div className="col-md-11 col-10">
                        <div>
                          <input
                            type="text"
                            name=""
                            className="search-area-text-input"
                            id=""
                            style={{
                              width: "100%",
                              border: "none",
                              borderColor: "transparent",
                              height: "40px",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="col-md-1 col-1"
                        style={{ margin: "auto" }}
                      >
                        <button
                          type="submit"
                          style={{
                            backgroundColor: "Transparent",
                            backgroundRepeat: "no-repeat",
                            cursor: "pointer",
                            overflow: "hidden",
                            outline: "none",
                            border: "none",
                          }}
                        >
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div
                  className="row"
                  style={{ marginTop: "15px", paddingBottom: "15px" }}
                >
                  <div className="col-6 navbar-center-align">
                    <a className="navbar-link navbar-upload-book" href="#">
                      <i className="fas fa-book"></i> Upload Book
                    </a>
                  </div>
                  <div className="btn-group col-6">
                    <button
                      type="button"
                      className="btn btn-secondary dropdown-toggle btn-transparent-bg"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Menu <i className="far fa-user-circle"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="#">
                          Setting
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          My Books
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Favourites
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="navbar-bg navbar-desktop">
              <a
                href="/"
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <div className="row" style={{ height: "64px" }}>
                  <div className="col-md-2 navbar-center-align">
                    <div className="row">
                      <div className="col-md-3" style={{ marginRight: "10px" }}>
                        <img
                          className="nav-logo-svg"
                          src="https://res.cloudinary.com/papero/image/upload/v1632813716/papero_duew3b.svg"
                          alt=""
                        />
                      </div>
                      <div className="col-md-7 navbar-center-align">
                        <h1 className="nav-logo-h1">PAPERO</h1>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-7 navbar-center-align">
                    <form action="">
                      <div
                        className="row search-area"
                        style={{ width: "80%", margin: "0px auto" }}
                      >
                        <div className="col-md-11">
                          <div>
                            <input
                              type="text"
                              name=""
                              className="search-area-text-input"
                              id=""
                              style={{
                                width: "100%",
                                border: "none",
                                borderColor: "transparent",
                                height: "40px",
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-md-1" style={{ margin: "auto" }}>
                          <button
                            type="submit"
                            style={{
                              backgroundColor: "transparent",
                              backgroundRepeat: "no-repeat",
                              cursor: "pointer",
                              overflow: "hidden",
                              outline: "none",
                              border: "none",
                            }}
                          >
                            <i className="fas fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="col-md-3 navbar-center-align">
                    <button className="navbar-link navbar-upload-book" href="#">
                      <i className="fas fa-book"></i> Upload Book
                    </button>
                    <a className="navbar-link" href="#" href="/login">
                      Login
                    </a>
                    <a className="navbar-link" href="#" href="/register">
                      Register
                    </a>
                  </div>
                </div>
              </a>
            </div>
            <div className="navbar-bg navbar-mobile" style={{ height: "auto" }}>
              <div className="row" style={{ height: "64px" }}>
                <div className="col-md-9 col-9 navbar-center-align">
                  <a
                    href="/"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <div className="row">
                      <div
                        className="col-md-3 col-3"
                        style={{ marginRight: "10px" }}
                      >
                        <img
                          className="nav-logo-svg"
                          src="https://res.cloudinary.com/papero/image/upload/v1632813716/papero_duew3b.svg"
                          alt="Papero Logo"
                        />
                      </div>
                      <div className="col-md-7 col-7 navbar-center-align">
                        <h1 className="nav-logo-h1">PAPERO</h1>
                      </div>
                    </div>
                  </a>
                </div>
                <div
                  className="col-3"
                  style={{
                    margin: "auto",
                    paddingRight: "10px",
                    textAlign: "right",
                  }}
                >
                  <a
                    className="icon"
                    style={{ color: "white" }}
                    onClick={showHiddenMenu}
                  >
                    <i className="fa fa-bars"></i>
                  </a>
                </div>
              </div>

              <div className="hidden-menu" id="myLinks" style={hiddenStyle}>
                <div className="col-12 navbar-center-align">
                  <form action="">
                    <div
                      className="row search-area"
                      style={{ width: "80%", margin: "0px auto" }}
                    >
                      <div className="col-md-11 col-10">
                        <div>
                          <input
                            type="text"
                            name=""
                            className="search-area-text-input"
                            id=""
                            style={{
                              width: "100%",
                              border: "none",
                              borderColor: "transparent",
                              height: "40px",
                            }}
                          />
                        </div>
                      </div>
                      <div
                        className="col-md-1 col-1"
                        style={{ margin: "auto" }}
                      >
                        <button
                          type="submit"
                          style={{
                            backgroundColor: "Transparent",
                            backgroundRepeat: "no-repeat",
                            cursor: "pointer",
                            overflow: "hidden",
                            outline: "none",
                            border: "none",
                          }}
                        >
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                <div
                  className="row"
                  style={{ marginTop: "15px", paddingBottom: "15px" }}
                >
                  <div className="col-md-6 col-12 navbar-center-align">
                    <a className="navbar-link navbar-upload-book" href="#">
                      <i className="fas fa-book"></i> Upload Book
                    </a>
                    <a className="navbar-link" href="#" href="/login">
                      Login
                    </a>
                    <a className="navbar-link" href="#" href="/register">
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default NavbarIndex;
