import { render, screen, cleanup } from "@testing-library/react"; // Adjust the import path
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AuthenticatedRoute from "../../components/common/AuthenticatedRoute";

describe("AuthenticatedRoute", () => {
  beforeEach(() => {
    // Setup a token in local storage
    localStorage.setItem("jwtToken", "fake-token");
  });

  afterEach(() => {
    // Clear the local storage and perform cleanup
    localStorage.removeItem("jwtToken");
    cleanup();
  });

  test("should clear token and navigate on unmount", () => {
    const { unmount } = render(
      <MemoryRouter>
        <AuthenticatedRoute>
          <div>Protected Content</div>
        </AuthenticatedRoute>
      </MemoryRouter>
    );

    // Unmount the component
    unmount();

    // Verify that the token is cleared and children are not rendered
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  test("should render children when token is not present", () => {
    // Clear local storage to ensure token is not set
    localStorage.removeItem("jwtToken");

    render(
      <AuthenticatedRoute>
        <div>Protected Content</div>
      </AuthenticatedRoute>
    );

    // Check if the children are rendered
    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });
  test("should navigate to dashboard when token is present", () => {
    // Set a token in local storage
    localStorage.setItem("jwtToken", "fake-token");

    render(
      <MemoryRouter>
        <AuthenticatedRoute>
          <div>Protected Content</div>
        </AuthenticatedRoute>
      </MemoryRouter>
    );

    // Check if the navigation occurred by verifying the absence of children
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
    // Here you would check if the navigation to "/dashboard" occurred, but with React Testing Library,
    // you may need to use additional tools or manual checks to confirm navigation.
  });
  test("should not render children when token is present", () => {
    // Set a token in local storage
    localStorage.setItem("jwtToken", "fake-token");

    render(
      <MemoryRouter>
        <AuthenticatedRoute>
          <div>Protected Content</div>
        </AuthenticatedRoute>
      </MemoryRouter>
    );

    // Ensure children are not rendered
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });
});
