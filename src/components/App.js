import React from "react";
import "./CreateTask";
import "../styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/app.css";
import NavBar from "../components/NavBar";
import Dashboard from "./Dashboard";
import CreateTask from "./CreateTask";
import CreateAccount from "./CreateAccount";
import SignIn from "./SignIn";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="create-task" element={<CreateTask />}></Route>
          <Route path="create-account" element={<CreateAccount />}></Route>
          <Route path="sign-in" element={<SignIn />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
