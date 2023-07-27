import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import qs from "qs";
import "../styles/sidebar.css";
import searchLogo from "../images/searchLogo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

const SideBar = ({ onStatusChange, changeUser }) => {
  const { search } = useLocation();
  const [searchItem, setSearchItem] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(true);

  const buildQueryString = (operation, valueObj) => {
    const currentQueryString = qs.parse(search, { ignoreQueryPrefix: true });
    const newQueryString = {
      ...currentQueryString,
      [operation]: JSON.stringify(valueObj),
    };
    return qs.stringify(newQueryString, {
      addQueryPrefix: true,
      encode: false,
    });
  };

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    setContentVisible(!contentVisible);
  };

  const handleUserChange = (e) => {
    e.preventDefault();
    changeUser(e.target.value);
  };

  const filteredUsers = [
    "David",
    "Max",
    "Ryan",
    "Jasmine",
    "Jasper",
    "Jessica",
  ].filter((user) => user.toLowerCase().includes(searchItem.toLowerCase()));

  return (
    <div className={`side-bar ${sidebarVisible ? "expanded" : "collapsed"}`}>
      <div className="logo-container" onClick={toggleSidebar}>
        {sidebarVisible ? (
          <AiIcons.AiOutlineClose className="sidebar-logo" />
        ) : (
          <FaIcons.FaBars className="sidebar-logo" />
        )}
      </div>
      {contentVisible && (
        <div className="side-bar-content">
          <div className="filter-user-container">
            <b>Filter by user</b>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search users"
                value={searchItem}
                onChange={handleSearch}
              />
              <img src={searchLogo} alt="Search" className="search-logo" />
            </div>
            {filteredUsers.map((user) => (
              <div className="user" key={user}>
                <button
                  className="user-filter_button"
                  type="button"
                  onClick={handleUserChange}
                  value={user}
                >
                  {user}
                </button>
              </div>
            ))}
            <div className="sort-container">
              <b>Sort by</b>
              <div className="priority">
                <Link
                  to={buildQueryString("sort", { priorityLevel: "priority" })}
                  className="priority-link"
                >
                  Priority
                </Link>
              </div>
              <div className="status">
                <Link
                  to={buildQueryString("sort", { status: "status" })}
                  className="status-link"
                >
                  Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
