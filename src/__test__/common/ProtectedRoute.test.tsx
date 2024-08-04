import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../../components/common/ProtectedRoute"; // Adjust the import path

// Mock localStorage
beforeEach(() => {
  vi.stubGlobal("localStorage", {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  });
});

describe("ProtectedRoute", () => {
  test("should render children when JWT token is present", () => {
    // Mock localStorage to return a token
    (localStorage.getItem as jest.Mock).mockReturnValue("mockToken");

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  test("should redirect to /login when JWT token is absent", () => {
    // Mock localStorage to return null
    (localStorage.getItem as jest.Mock).mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("should not render protected content when redirected to /login", () => {
    // Mock localStorage to return null
    (localStorage.getItem as jest.Mock).mockReturnValue(null);

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Check that protected content is not rendered
    expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
  });

  test("should call localStorage.getItem once during the route check", () => {
    // Mock localStorage to return a token
    (localStorage.getItem as jest.Mock).mockReturnValue("mockToken");

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected Content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Check that localStorage.getItem was called once
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem).toHaveBeenCalledWith("jwtToken");
  });
});
