import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import qs from "qs";
import "../styles/sidebar.css";
import searchLogo from "../images/searchLogo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

const SideBar = ({ setSortByPriority, sortByPriority }) => {
  const { search } = useLocation();
  const [searchItem, setSearchItem] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(true);
  const [existingUsers, setExistingUsers] = useState([]);

  useEffect(() => {
    fetchExistingUsersList();
  });

  const fetchExistingUsersList = async () => {
    try {
      const users = await axios.get("/user");
      const userFirstNames = users.data.map((user) => user.firstName);
      setExistingUsers(userFirstNames);
    } catch (err) {
      console.error("Error fetching existing users", err);
    }
  };

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

  const handleUserChange = (user) => {
    setSearchItem(user);
  };

  const filteredUsers = existingUsers.filter(
    (user) => user && user.toLowerCase().includes(searchItem.toLowerCase())
  );

  const handlePrioritySort = () => {
    setSortByPriority(!sortByPriority);
  };

  return (
    <div className={`side-bar ${sidebarVisible ? "expanded" : "collapsed"}`}>
      <div className="logo-container" onClick={toggleSidebar}>
        {sidebarVisible ? (
          <AiIcons.AiOutlineClose className="sidebar-logo" size={28} />
        ) : (
          <FaIcons.FaBars className="sidebar-logo" size={28} />
        )}
      </div>
      {contentVisible && (
        <div className="side-bar-content">
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
          <div className="filter-user-container">
            {filteredUsers.map((user, index) => (
              <div className="user" key={index}>
                <button
                  className="user-filter_button"
                  type="button"
                  onClick={() => handleUserChange(user)}
                  value={user}
                >
                  {user}
                </button>
              </div>
            ))}
          </div>
          <div className="sort-container">
            <b>Sort by</b>
            <div className="priority">
              <Link
                to={buildQueryString("sort", {
                  priorityLevel: "priority",
                  order: "desc",
                })}
                className="priority-link"
                onClick={() => {
                  handlePrioritySort();
                  setSortByPriority(!sortByPriority);
                }}
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
      )}
    </div>
  );
};

export default SideBar;
