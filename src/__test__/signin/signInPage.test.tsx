import { screen, fireEvent, waitFor, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import SignIn from "../../components/signin/signInPage";

test("initially disables the Sign In button", () => {
  render(
    <Router>
      {" "}
      {/* Wrap your component with Router */}
      <SignIn />
    </Router>
  );

  // Check that the Sign In button is initially disabled
  const signInButton = screen.getByRole("button", { name: /sign in/i });
  expect(signInButton).toBeDisabled();
});

test("displays email validation error when email is empty or invalid", async () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );

  // Enter an invalid email address
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "invalid-email" },
  });

  // Click the Sign In button
  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

  // Check for validation error
  await waitFor(() => {
    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
  });
});

test("displays password validation error when password is too short", async () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );

  // Enter a password that is too short
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "short" },
  });

  // Click the Sign In button
  fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

  // Check for validation error
  await waitFor(() => {
    expect(
      screen.getByText(/password must be at least 8 characters long/i)
    ).toBeInTheDocument();
  });
});

test("does not display password validation error for valid password", async () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );

  // Enter a valid password
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "validpassword" },
  });

  // Ensure no validation error is present
  await waitFor(() => {
    expect(
      screen.queryByText(/password must be at least 8 characters long/i)
    ).toBeNull();
  });
});

test("Sign In button is disabled when fields are empty", () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );

  // Assert that the button is initially disabled
  const signInButton = screen.getByRole("button", { name: /sign in/i });
  expect(signInButton).toBeDisabled();
});

test("Sign In button is enabled when both email and password are valid", async () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );

  // Enter valid email
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "valid@example.com" },
  });

  // Enter valid password
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "validpassword" },
  });

  // Wait for the validation state to update
  await waitFor(() => {
    // Assert that the button is enabled
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).not.toBeDisabled();
  });
});

test("Sign In button is disabled when email is invalid or password is too short", () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );

  // Enter an invalid email
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "invalid-email" },
  });

  // Enter a valid password
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "validpassword" },
  });

  // Assert that the button is disabled
  const signInButton = screen.getByRole("button", { name: /sign in/i });
  expect(signInButton).toBeDisabled();

  // Clear email and enter a short password
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "" },
  });

  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "short" },
  });

  // Assert that the button is still disabled
  expect(signInButton).toBeDisabled();
});

test("Sign In button is disabled when email is empty and password is filled", async () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );

  // Enter a valid password
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "validpassword" },
  });

  // Check if the button is disabled
  await waitFor(() => {
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeDisabled();
  });
});

test("Sign In button is disabled when password is empty and email is filled", async () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );

  // Enter a valid email
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "valid@example.com" },
  });

  // Check if the button is disabled
  await waitFor(() => {
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeDisabled();
  });
});

test("Sign In button is disabled when email is invalid and password is valid", async () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );

  // Enter an invalid email
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: "invalid-email" },
  });

  // Enter a valid password
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: "validpassword" },
  });

  // Check if the button is disabled
  await waitFor(() => {
    const signInButton = screen.getByRole("button", { name: /sign in/i });
    expect(signInButton).toBeDisabled();
  });
});
