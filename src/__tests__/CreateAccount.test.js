import React from "react";
import axios from "axios";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import CreateAccount from "../components/CreateAccount";
import { createUserWithEmailAndPassword } from "firebase/auth";

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
    createUserWithEmailAndPassword: jest.fn(() =>
      Promise.resolve({ user: { displayName: "testUser" } })
    ),
  };
});

jest.mock("axios", () => ({
  post: jest.fn(),
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe("CreateAccount component", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <Router>
        <CreateAccount />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("updates state when input fields change", () => {
    render(
      <Router>
        <CreateAccount />
      </Router>
    );
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const usernameInput = screen.getByLabelText("Username");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(usernameInput, { target: { value: "testUser123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
    expect(usernameInput.value).toBe("testUser123");
  });

  it("submits the form correctly", async () => {
    render(
      <Router>
        <CreateAccount />
      </Router>
    );
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const usernameInput = screen.getByLabelText("Username");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(usernameInput, { target: { value: "testUser123" } });

    axios.post.mockResolvedValue({});
    createUserWithEmailAndPassword.mockResolvedValue({ user: {} });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.any(Object),
        "test@example.com",
        "password123"
      );
    });
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith("/user", {
        email: "test@example.com",
        password: "password123",
        userName: "testUser123",
      });
    });
  });
});
