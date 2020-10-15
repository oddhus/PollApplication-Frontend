import React from "react";
import { render, screen } from "@testing-library/react";
import { AccountPage } from "../pages/AccountPage";
import "mutationobserver-shim";

test("renders change email and password buttons", () => {
  const { getByText } = render(<AccountPage />);
  const emailElement = getByText(/Change Email/);
  const passwordElement = getByText(/Change Password/);
  expect(emailElement).toBeInTheDocument();
  expect(passwordElement).toBeInTheDocument();
});
