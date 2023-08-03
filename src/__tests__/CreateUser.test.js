import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateUser from "../components/CreateUser";

const onSetLoggedInUser = jest.fn();

describe("renders", () => {
  const validProps = {
    id: 1,
    userName: "test",
    firstName: "test",
  };
  it("renders correctly", () => {
    const { asFragment } = render(
      <Router>
        <CreateUser onSetLoggedInUser={onSetLoggedInUser} user={validProps} />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
