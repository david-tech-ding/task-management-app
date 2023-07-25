import React, { useState } from "react";
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

  return (
    <div className="App">
      <NavBar className="navbar" onLogout={handleLogout} userId={userId} />
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
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
  );
};

export default App;
