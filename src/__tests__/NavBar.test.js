import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import NavBar from "../components/NavBar";

describe("NavBar component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <Router>
        <NavBar user={[]} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
