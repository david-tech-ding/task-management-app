import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import taskLogo from "../images/taskLogo.png";

const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <img
          src={taskLogo}
          alt="clinic-task-logo"
          className="navbar-logo"
        ></img>
        <h2 className="navbar-title">CTM</h2>
        <ul className="navbar-links">
          <li className="navbar-links-item">
            <Link to="dashboard">Dashboard</Link>
          </li>
          <li className="navbar-links-item">
            <Link to="create-task">Create Task</Link>
          </li>
        </ul>
        <div className="signin-button">
          <button className="signin">SIGN IN</button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
