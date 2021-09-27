import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Navbar, Dropdown, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import UserFavourite from "../pages/user/UserFavourite";
import jwt from "jwt-decode"; // import dependency

function NavbarIndex(props) {
  const [query, setQuery] = useState("");
  const authToken = localStorage.getItem("authToken") || "empty";
  const isAuthenticated = localStorage.getItem("authToken");
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
          const user = jwt(authToken);
          userInfo = user;
        } else if (res.status === 401) {
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
        if (res.status === 200) {
          localStorage.clear();
          window.location.pathname = "/";
        } else {
          console.log("not ok", res.data);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    // props.handleOnSubmit()
    props.onSearch(query);
    setQuery("");
  }
  function handleOnChange(e) {
    const value = e.target.value;
    setQuery(value);
  }
  return (
    <Navbar
      sticky="top"
      className="navbar navbar-expand-sm navbar-light"
      style={{
        backgroundColor: "darkred",
        width: "calc(100% + 18vw)",
        margin: "-90px -9vw 0",
      }}
    >
      <Link className="navbar-brand" to="/">
        <img
          src=""
          alt=""
          width="30"
          height="24"
          className="d-inline-block align-top"
        />
        <span className="hidden" style={{ color: "floralwhite" }}>
          PAPERO
        </span>
      </Link>
      <form onSubmit={handleOnSubmit}>
        <input
          onChange={handleOnChange}
          type="text"
          style={{ width: "500px" }}
          name="searchbar"
          value={query}
          id="searchbar"
        />
        <button type="submit">Go!</button>
      </form>
      <ul className="navbar-nav ms-auto text-center">
        <li>
          <a
            className="nav-link"
            href="/user/upload"
            style={{ color: "floralwhite" }}
          >
            Upload Book
          </a>
        </li>
        {/* <li>
          <a className="nav-link" href="/" style={{ color: "floralwhite" }}>
            Forum
          </a>
        </li> */}
        {!isAuthenticated && (
          <li>
            <a
              className="nav-link"
              href="/register"
              style={{ color: "floralwhite" }}
            >
              Sign Up
            </a>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <a
              className="nav-link"
              href="/login"
              style={{ color: "floralwhite" }}
            >
              Login
            </a>
          </li>
        )}
        {isAuthenticated && (
          <Dropdown as={ButtonGroup}>
            <Button variant="success">My Profile</Button>

            <Dropdown.Toggle
              split
              variant="success"
              id="dropdown-split-basic"
            />

            <Dropdown.Menu>
              <Dropdown.Item href="/user/setting">Setting</Dropdown.Item>
              <Dropdown.Item href="/user/info">My Books</Dropdown.Item>
              {/* <Dropdown.Item href="#/action-3">Request Book</Dropdown.Item> */}
              <Dropdown.Item href="/user/favourite">
                Favourite List
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogOut}>Log Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </ul>
    </Navbar>
  );
}

export default NavbarIndex;
