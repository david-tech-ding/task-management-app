import React, { useState, createContext } from "react";
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
import SideBar from "./SideBar";
import CreateUser from "./CreateUser";
import TaskCardPage from "./TaskCardPage";

export const ThemeContext = createContext(null);

const App = () => {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserId("");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <NavBar
          className="navbar"
          onLogout={handleLogout}
          userId={userId}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route
            path="create-account"
            element={<CreateAccount onSetUser={setUserId} />}
          />
          <Route path="sign-in" element={<SignIn onSetUser={setUserId} />} />
          <Route path="your-tasks" element={<TaskCardPage />} />
          <Route path="create-user" element={<CreateUser />} />
        </Routes>
        <SideBar className="sidebar" />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
