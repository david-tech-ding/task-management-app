import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import Dashboard from "../components/Dashboard";

describe("Dashboard component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <Router>
        <Dashboard user={[]} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
