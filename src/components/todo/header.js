import React, { useContext } from "react";
import { SettingContext } from "../../context/settings.js";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";


function Header() {
  const settingContext = useContext(SettingContext);

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Your Task Manager</Navbar.Brand>
      <Nav>
        <button
          className="toggle-hide"
          onClick={(e) => settingContext.changeHide(!settingContext.hide)}
        >
          {!settingContext.hide ? "Hide Complete" : "Show Complete"}
        </button>{" "}
        <Dropdown onSelect={(e) => settingContext.changeOrder(e)}>
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            Sort Order
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="assignee">Name</Dropdown.Item>
            <Dropdown.Item eventKey="text">Chore</Dropdown.Item>
            <Dropdown.Item eventKey="difficulty">Difficulty</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>

    </Navbar>
  );
}

export default Header;
