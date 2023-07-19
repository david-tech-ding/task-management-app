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
        <Route path="dashboard" element={<Dashboard />}></Route>
        <Route path="create-task" element={<CreateTask />}></Route>
        <Route path="create-account" element={<CreateAccount />}></Route>
        <Route path="sign-in" element={<SignIn />}></Route>
      </Routes>
      <SideBar />
    </div>
  );
};

export default App;
