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
import TaskCard from "./TaskCard";
import CreateUser from "./CreateUser";

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
      <NavBar onLogout={handleLogout} userId={userId} />
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create-task" element={<CreateTask />} />
        <Route path="create-account" element={<CreateAccount />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route
          path="your-tasks"
          element={
            <TaskCard
              title="test"
              priorityLevel="High"
              details="Some test details"
              dueDate="Fri Jul 28 2023"
              status="In Progress"
            />
          }
        />
        <Route path="create-user" element={<CreateUser />} />
      </Routes>
      <SideBar />
    </div>
  );
};

export default App;
