import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Navbar, Dropdown, Button, ButtonGroup } from "react-bootstrap";

function NavbarIndex(props) {
  const [query, setQuery] = useState("");
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
        <li>
          <a
            className="nav-link"
            href="/register"
            style={{ color: "floralwhite" }}
          >
            Sign Up
          </a>
        </li>
        <li>
          <a
            className="nav-link"
            href="/login"
            style={{ color: "floralwhite" }}
          >
            Login
          </a>
        </li>
        <Dropdown as={ButtonGroup}>
          <Button variant="success">User001</Button>

          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

          <Dropdown.Menu>
            <Dropdown.Item href="/user/setting">Setting</Dropdown.Item>
            <Dropdown.Item href="#/action-2">My Books</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Request Book</Dropdown.Item>
            <Dropdown.Item href="#/action-4">Favourite List</Dropdown.Item>
            <Dropdown.Item href="#/action-5">Notifications</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </ul>
    </Navbar>
  );
}

export default NavbarIndex;
