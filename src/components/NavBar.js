import React from "react";
import ReactSwitch from "react-switch";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import ctmLogo from "../images/ctmLogo.png";
import { FaRegMoon } from "react-icons/fa";
import { BiSun } from "react-icons/bi";

const NavBar = ({ user, onLogout, theme, toggleTheme }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">
        <img
          src={ctmLogo}
          alt="clinic-task-logo"
          className="navbar-logo"
          onClick={() => {
            if (user.firstName) {
              navigate("/");
            } else {
              navigate("/create-user");
            }
          }}
        ></img>
        {user.firstName ? (
          <ul className="navbar-links">
            <li className="navbar-links-item">
              <Link className="navbar-links-item_text" to="/">
                Dashboard
              </Link>
            </li>
            <li className="navbar-links-item">
              <Link className="navbar-links-item_text" to="create-task">
                Create Task
              </Link>
            </li>
          </ul>
        ) : null}
        <div className="switch-container">
          <ReactSwitch
            className="switch"
            onChange={toggleTheme}
            checked={theme === "dark"}
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
        {user.id ? (
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
