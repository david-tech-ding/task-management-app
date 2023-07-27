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
import CreateUser from "./CreateUser";
import TaskCardPage from "./TaskCardPage";

export const ThemeContext = createContext(null);

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({
    id: "",
    userName: "",
  });
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedInUser({ id: "", userName: "" });
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
          userId={loggedInUser.id}
          toggleTheme={toggleTheme}
          theme={theme}
        />
        <Routes>
          <Route
            path="/"
            element={<Dashboard user={loggedInUser.userName} />}
          />
          <Route
            path="create-task"
            element={<CreateTask user={loggedInUser.userName} />}
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
          <Route path="tasks" element={<TaskCardPage />} />
          <Route path="create-user" element={<CreateUser />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
