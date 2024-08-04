import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from "../../App";

// Mock components
vi.mock("../../components/signin/signInPage.tsx", () => ({
  default: () => <div>SignIn Page</div>,
}));
vi.mock("../../components/signup/signUpPage.tsx", () => ({
  default: () => <div>SignUp Page</div>,
}));
vi.mock("../../components/forgotpassword/forgotPassword.tsx", () => ({
  default: () => <div>ForgotPassword Page</div>,
}));
vi.mock("../../components/common/profileComp.tsx", () => ({
  default: () => (
    <div>
      <span>Profile</span> <span>Page</span>
    </div>
  ),
}));
vi.mock("../../components/dashboard/dashBoard.tsx", () => ({
  default: () => <div>DashBoard Page</div>,
}));
vi.mock("../../components/signup/otpPage.tsx", () => ({
  default: () => <div>OtpPage</div>,
}));
vi.mock("../../components/common/ProtectedRoute.tsx", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock("../../components/common/AuthenticatedRoute.tsx", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("App Component", () => {
  it("should not render DashBoard page on /dashboard route when not authenticated", () => {
    const router = createMemoryRouter([
      { path: "/dashboard", element: <App /> },
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.queryByText("DashBoard Page")).not.toBeInTheDocument();
  });

  it("should not render OtpPage on /verification route when not registered", () => {
    const router = createMemoryRouter([
      { path: "/verification", element: <App /> },
    ]);

    render(<RouterProvider router={router} />);

    expect(screen.queryByText("OtpPage")).not.toBeInTheDocument();
  });

  it("should render ToastContainer", () => {
    render(<App />);
    const toastContainer = document.querySelector(".Toastify");
    expect(toastContainer).toBeInTheDocument();
  });
});
