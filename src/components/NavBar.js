import React, { useState } from "react";
import ReactSwitch from "react-switch";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import ctmLogo from "../images/ctmLogo.png";
import { FaRegMoon, FaBars } from "react-icons/fa";
import { BiSun } from "react-icons/bi";

const NavBar = ({ user, onLogout, theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  };

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
            height={16}
            width={40}
            offColor="#a6d9f7"
            onColor="#536390"
            checkedIcon={
              <div className="icon-container-moon">
                <FaRegMoon size={14} />
              </div>
            }
            uncheckedIcon={
              <div className="icon-container-sun">
                <BiSun size={14} />
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
      <div className="mobile-navbar">
        <div className="mobile-logo">
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
        </div>
        <div className="switch-container">
          <ReactSwitch
            className="switch"
            onChange={toggleTheme}
            checked={theme === "dark"}
            height={16}
            width={40}
            offColor="#a6d9f7"
            onColor="#536390"
            checkedIcon={
              <div className="icon-container-moon">
                <FaRegMoon size={14} />
              </div>
            }
            uncheckedIcon={
              <div className="icon-container-sun">
                <BiSun size={14} />
              </div>
            }
          />
        </div>
        <div className="mobile-nav-menu">
          {user.id ? (
            <div>
              <FaBars
                size={30}
                color="fffcf7"
                onClick={handleMenuClick}
              ></FaBars>
              {menuOpen ? (
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
                  <li className="navbar-links-item">
                    <button
                      className="signout-button"
                      type="submit"
                      onClick={onLogout}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              ) : null}
            </div>
          ) : (
            <div className="navbar-login">
              <Link className="navbar-links-item_auth" to="create-account">
                Create Account
              </Link>
              <Link className="navbar-links-item_auth" to="sign-in">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
