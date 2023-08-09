import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/sidebar.css";
import searchLogo from "../images/searchLogo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

const SideBar = ({
  setSortByPriority,
  sortByPriority,
  setSortByDate,
  sortByDate,
  filterTasksByStatus,
  changeUser,
}) => {
  const [searchItem, setSearchItem] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [contentVisible, setContentVisible] = useState(true);
  const [existingUsers, setExistingUsers] = useState([]);

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [priorityMenuOpen, setPriorityMenuOpen] = useState(false);
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  const navigate = useNavigate();
  const search = useLocation();

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

  const handleSearch = (e) => {
    setSearchItem(e.target.value);
  };

  const clearFilters = () => {
    if (
      search.pathname === "/your-tasks" ||
      search.pathname === "/assigned-by-you" ||
      search.pathname === "/due-soon"
    ) {
      console.log("Filters cleared!");
    } else {
      navigate(-1);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    setContentVisible(!contentVisible);
  };

  const filteredUsers = existingUsers.filter(
    (user) => user && user.toLowerCase().includes(searchItem.toLowerCase())
  );

  const handlePrioritySort = () => {
    setSortByPriority(!sortByPriority);
  };

  const handleDateSort = () => {
    setSortByDate(!sortByDate);
  };

  const handlePriorityClick = () => {
    setPriorityMenuOpen(!priorityMenuOpen);
  };

  const handleStatusClick = () => {
    setStatusMenuOpen(!statusMenuOpen);
  };

  const handleUserClick = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleUserFilter = (e) => {
    changeUser(e.target.value);
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
          <div className="user-container">
            <div className="side-bar-header" onClick={handleUserClick}>
              Filter by User
            </div>
            {userMenuOpen && (
              <div className="user-options">
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
                        onClick={handleUserFilter}
                        value={user}
                      >
                        {user}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="status-container">
            <div className="side-bar-header" onClick={handleStatusClick}>
              Filter by Status
            </div>
            {statusMenuOpen && (
              <div className="status-options">
                <Link
                  to="/completed"
                  className="selected-option"
                  onClick={filterTasksByStatus}
                >
                  Completed
                </Link>
                <Link to="/in-progress" className="selected-option">
                  In Progress
                </Link>
                <Link to="/not-started" className="selected-option">
                  Not Started
                </Link>
                <button
                  className="sidebar-clear-button"
                  type="button"
                  onClick={clearFilters}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
          <div className="priority-container">
            <div className="priority-header" onClick={handlePriorityClick}>
              Sort by Priority
            </div>
            {priorityMenuOpen && (
              <div className="priority-options">
                <div className="selected-option" onClick={handlePrioritySort}>
                  High to Low
                </div>
                <div className="selected-option" onClick={handleDateSort}>
                  Soonest due
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
