import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Navbar, Dropdown, Button, ButtonGroup } from "react-bootstrap";
import axios from 'axios'

function NavbarIndex(props) {
  const [query, setQuery] = useState("");
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  let userInfo;
  if(isAuthenticated){
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://localhost:5000/users/checkIsLoggedIn", config)
      .then((res) => {
        if (res.data.statusCode === '200') {
          userInfo = (res.data.user)          
        } else if(res.data.statusCode === '401'){
          localStorage.clear()
          window.location.pathname = "/"
          isAuthenticated=false
        }
      })
      .catch((err) => console.log(err));
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    // props.handleOnSubmit()
    props.onSearch(query)
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
      style={{ backgroundColor: "darkred" }}
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
        <li>
          <a className="nav-link" href="/" style={{ color: "floralwhite" }}>
            Forum
          </a>
        </li>
        {!isAuthenticated && <li>
          <a
            className="nav-link"
            href="/register"
            style={{ color: "floralwhite" }}
          >
            Sign Up
          </a>
        </li>}
        {!isAuthenticated && <li>
          <a
            className="nav-link"
            href="/login"
            style={{ color: "floralwhite" }}
          >
            Login
          </a>
        </li>}
        {isAuthenticated && <Dropdown as={ButtonGroup}>
          <Button variant="success">My Profile</Button>

          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item href="/user/setting">Setting</Dropdown.Item>
            <Dropdown.Item href="#/action-2">My Books</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Request Book</Dropdown.Item>
            <Dropdown.Item href="#/action-4">Favourite List</Dropdown.Item>
            <Dropdown.Item href="#/action-5">Notifications</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>}
      </ul>
    </Navbar>
  );
}

export default NavbarIndex;
