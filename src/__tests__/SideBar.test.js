import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SideBar from "../components/SideBar";

const changeUser = jest.fn();

describe("renders", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <Router>
        <SideBar changeUser={changeUser} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
