import React from "react";
import "../styles/landingpage.css";

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="typewriter">
        <h1>Clinic Task Manager</h1>
      </div>
      <div className="fade-in">
        <p className="login-prompt-blurb">
          To continue, please log in to your account or create a new one to get
          started.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
