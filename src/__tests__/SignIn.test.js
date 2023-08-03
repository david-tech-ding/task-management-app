import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import SignIn from "../components/SignIn.js";
import { signInWithEmailAndPassword } from "firebase/auth";

jest.mock("../config/firebase", () => {
  return {
    auth: {
      currentUser: {
        updateProfile: jest.fn(),
      },
    },
  };
});

jest.mock("firebase/auth", () => {
  return {
    signInWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({ user: { displayName: "testUser" } })
    ),
  };
});

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe("SignIn component", () => {
  const onSetLoggedInUser = jest.fn();
  const loggedInUser = { id: "", userName: "", firstName: "" };

  it("renders the component correctly", () => {
    const { asFragment } = render(
      <Router>
        <SignIn
          onSetLoggedInUser={onSetLoggedInUser}
          loggedInUser={loggedInUser}
        />
      </Router>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("updates state when input fields change", () => {
    render(
      <Router>
        <SignIn
          onSetLoggedInUser={onSetLoggedInUser}
          loggedInUser={loggedInUser}
        />
      </Router>
    );
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("submits the form correctly", async () => {
    render(
      <Router>
        <SignIn
          onSetLoggedInUser={onSetLoggedInUser}
          loggedInUser={loggedInUser}
        />
      </Router>
    );
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByText("SIGN IN");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    axios.get.mockResolvedValue({ data: [{}] });
    signInWithEmailAndPassword.mockResolvedValue({
      user: {
        email: "test@example.com",
        password: "password123",
        displayName: "testdisplayName",
      },
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object),
        "test@example.com",
        "password123"
      );
    });
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("/user/username/testdisplayName");
    });
  });
});
