import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LandingPage from "../components/LandingPage";

describe("renders", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <Router>
        <LandingPage />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
