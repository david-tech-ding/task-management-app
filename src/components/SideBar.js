import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import qs from "qs";
import "../styles/sidebar.css";
import searchLogo from "../images/searchLogo.png";
import sideBarLogo from "../images/sideBarLogo.png";

const SideBar = () => {
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
        <img src={sideBarLogo} alt="Sidebar Logo" className="sidebar-logo" />
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
                <Link
                  to={buildQueryString("query", { user })}
                  className="user-link"
                >
                  {user}
                </Link>
              </div>
            ))}

            <div className="sort-container">
              <b>Sort by</b>
              <div className="priority">
                <Link
                  to={buildQueryString("query", { priority: "High" })}
                  className="priority-link"
                >
                  High Priority
                </Link>
              </div>
              <div className="priority">
                <Link
                  to={buildQueryString("query", { priority: "Medium" })}
                  className="priority-link"
                >
                  Medium Priority
                </Link>
              </div>
              <div className="priority">
                <Link
                  to={buildQueryString("query", { priority: "Low" })}
                  className="priority-link"
                >
                  Low Priority
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
