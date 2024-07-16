import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ForgotPassword from '../components/forgotPassword';

describe('ForgotPassword component', () => {
  it('renders without crashing', () => {
    render(<ForgotPassword />);
    // Ensure the component renders without errors
    expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
  });

  it('shows error if email is invalid', async () => {
    render(<ForgotPassword />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    fireEvent.click(screen.getByText(/SEND KEY/i));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
  });

  it('shows error if email does not exist', async () => {
    render(<ForgotPassword />);
    const emailInput = screen.getByLabelText(/Email Address/i);
    fireEvent.change(emailInput, { target: { value: 'nonexistent@example.com' } });

    fireEvent.click(screen.getByText(/SEND KEY/i));

    await waitFor(() => {
      expect(screen.getByText(/Email does not exist in the database/i)).toBeInTheDocument();
    });
  });

  it('validates secret key successfully', async () => {
    render(<ForgotPassword />);
    const keyInput = screen.getByLabelText(/Secret key/i);
    fireEvent.change(keyInput, { target: { value: '123456' } });

    fireEvent.click(screen.getByText(/VALIDATE KEY/i));

    await waitFor(() => {
      expect(screen.getByText(/Set Password/i)).toBeInTheDocument();
    });
  });

  it('shows error if password is too short', async () => {
    render(<ForgotPassword />);
    const passwordInput = screen.getByLabelText(/New Password/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });

    fireEvent.click(screen.getByText(/Set Password/i));

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 8 characters long/i)).toBeInTheDocument();
    });
  });
});
