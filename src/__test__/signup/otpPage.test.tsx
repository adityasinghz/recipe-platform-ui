import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OtpPage from "../../components/signup/otpPage";
// Mock useNavigate
const navigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => navigate,
}));

// Mock necessary modules
vi.mock("../../utils/user_service/user_api", () => ({
  sentOTP: vi.fn(),
  verifyOTP: vi.fn(),
  registerUser: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("OtpPage", () => {
  it("redirects if justRegistered is not set", () => {
    sessionStorage.removeItem("justRegistered");
    render(<OtpPage />);
    expect(navigate).toHaveBeenCalledWith("/");
  });
  it("renders the OtpPage component", () => {
    render(<OtpPage />);
    expect(screen.getByLabelText(/OTP/i)).toBeInTheDocument();
    expect(screen.getByText(/Validate OTP/i)).toBeInTheDocument();
    expect(screen.getByText(/Resend/i)).toBeInTheDocument();
  });
  it("displays validation error for invalid OTP", async () => {
    render(<OtpPage />);
    const otpInput = screen.getByLabelText(/OTP/i);
    fireEvent.blur(otpInput);
    fireEvent.change(otpInput, { target: { value: "12345" } }); // Invalid OTP
    fireEvent.submit(screen.getByRole("button", { name: /Validate OTP/i }));

    expect(
      await screen.findByText(/Secret key must be 6 digits/i)
    ).toBeInTheDocument();
  });
  it("renders OTP input field and buttons correctly", () => {
    render(<OtpPage />);
    expect(screen.getByLabelText(/OTP/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Validate OTP/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Resend/i })).toBeInTheDocument();
  });
  it("shows validation error for invalid OTP", async () => {
    render(<OtpPage />);
    const otpInput = screen.getByLabelText(/OTP/i);
    fireEvent.change(otpInput, { target: { value: "12345" } }); // Invalid OTP
    fireEvent.blur(otpInput);

    expect(
      await screen.findByText(/Secret key must be 6 digits/i)
    ).toBeInTheDocument();
  });
  it("shows no validation error for valid OTP", async () => {
    render(<OtpPage />);
    const otpInput = screen.getByLabelText(/OTP/i);
    fireEvent.change(otpInput, { target: { value: "123456" } }); // Valid OTP
    fireEvent.blur(otpInput);

    expect(
      screen.queryByText(/Secret key must be 6 digits/i)
    ).not.toBeInTheDocument();
  });
  it('disables "Validate OTP" button if form is invalid', async () => {
    render(<OtpPage />);
    const otpInput = screen.getByLabelText(/OTP/i);
    fireEvent.change(otpInput, { target: { value: "12345" } }); // Invalid OTP
    fireEvent.blur(otpInput);

    const submitButton = screen.getByRole("button", { name: /Validate OTP/i });
    expect(submitButton).toBeDisabled();
  });
});
