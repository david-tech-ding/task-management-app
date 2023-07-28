import React from "react";
import ReactSwitch from "react-switch";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import taskLogo from "../images/taskLogo.png";
import { FaRegMoon } from "react-icons/fa";
import { BiSun } from "react-icons/bi";

const NavBar = ({ userId, onLogout, theme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">
        <img
          src={taskLogo}
          alt="clinic-task-logo"
          className="navbar-logo"
          onClick={() => navigate("/")}
        ></img>
        <h2 className="navbar-title" onClick={() => navigate("/")}>
          CTM
        </h2>
        <ul className="navbar-links">
          <li className="navbar-links-item">
            <Link to="/">Dashboard</Link>
          </li>
          <li className="navbar-links-item">
            <Link to="create-task">Create Task</Link>
          </li>
          <li className="navbar-links-item">
            <Link to="create-user">Add New User</Link>
          </li>
        </ul>
        <div className="switch">
          <ReactSwitch
            onChange={toggleTheme}
            checked={theme === "dark"}
            onColor="#2196F3"
            offColor="#BDBDBD"
            checkedIcon={
              <div className="icon-container-moon">
                <FaRegMoon size={16} />
              </div>
            }
            uncheckedIcon={
              <div className="icon-container-sun">
                <BiSun size={16} />
              </div>
            }
          />
        </div>
        {userId ? (
          <div className="navbar-signout">
            <button className="signout-button" type="submit" onClick={onLogout}>
              Sign out
            </button>
          </div>
        ) : (
          <div className="navbar-login">
            <Link className="navbar-links-auth" to="create-account">
              <button className="auth-button">Create Account</button>
            </Link>
            <Link className="navbar-links-auth" to="sign-in">
              <button className="auth-button">Sign In</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
