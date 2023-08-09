import React, { useState, createContext, useEffect } from "react";
import { AuthProvider } from "../context/AuthProvider";
import axios from "axios";
import "./CreateTask";
import "../styles/app.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import "../styles/app.css";
import NavBar from "../components/NavBar";
import Dashboard from "./Dashboard";
import CreateTask from "./CreateTask";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";
import CreateUser from "./CreateUser";
import TaskCardPage from "./TaskCardPage";
import LandingPage from "./LandingPage";
import UserCardPage from "./UserCardPage";

export const ThemeContext = createContext(null);
axios.defaults.baseURL = "http://localhost:3001";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({
    id: "",
    userName: "",
    firstName: "",
  });

  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [theme, setTheme] = useState("light");

  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedInUser({ id: "", userName: "" });
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.body.className = theme;
    return () => {
      document.body.className = "";
    };
  }, [theme]);

  useEffect(() => {
    axios
      .get("/user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  useEffect(() => {
    axios
      .get(`/user/username/${loggedInUser.userName}`)
      .then((response) => {
        if (response.data[0].jobRole === "Clinic Manager") {
          setAdmin(true);
        }
      })
      .catch((err) => console.error(err));
  }, [loggedInUser]);

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="App">
          <NavBar
            className="navbar"
            onLogout={handleLogout}
            user={loggedInUser}
            toggleTheme={toggleTheme}
            theme={theme}
            isAdmin={admin}
          />
          <Routes>
            <Route
              path="/"
              element={
                loggedInUser.id ? (
                  <Dashboard user={loggedInUser} isAdmin={admin} />
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route
              path="create-task"
              element={<CreateTask user={loggedInUser} users={users} />}
            />
            <Route
              path="create-account"
              element={
                <CreateAccount
                  onSetLoggedInUser={setLoggedInUser}
                  loggedInUser={loggedInUser}
                />
              }
            />
            <Route
              path="sign-in"
              element={
                <SignIn
                  onSetLoggedInUser={setLoggedInUser}
                  loggedInUser={loggedInUser}
                />
              }
            />
            <Route
              path="your-tasks"
              element={<TaskCardPage user={loggedInUser} users={users} />}
            />
            <Route
              path="assigned-by-you"
              element={<TaskCardPage user={loggedInUser} users={users} />}
            />
            <Route
              path="due-soon"
              element={<TaskCardPage user={loggedInUser} users={users} />}
            />
            <Route
              path="/your-tasks/completed"
              element={<TaskCardPage user={loggedInUser} users={users} />}
            />
            <Route
              path="/your-tasks/in-progress"
              element={<TaskCardPage user={loggedInUser} users={users} />}
            />
            <Route
              path="/your-tasks/not-started"
              element={<TaskCardPage user={loggedInUser} users={users} />}
            />
            <Route
              path="all-tasks"
              element={
                <TaskCardPage
                  user={loggedInUser}
                  users={users}
                  isAdmin={admin}
                />
              }
            />
            <Route
              path="manage-users"
              element={<UserCardPage isAdmin={admin} />}
            />
            <Route
              path="create-user"
              element={
                <CreateUser
                  onSetLoggedInUser={setLoggedInUser}
                  user={loggedInUser}
                />
              }
            />
          </Routes>
        </div>
      </ThemeContext.Provider>
    </AuthProvider>
  );
};

export default App;
