import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import SignUp from '../../components/signup/signUpPage';

test('initially disables the Sign Up button', () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );

  const signUpButton = screen.getByRole('button', { name: /sign up/i });
  expect(signUpButton).toBeDisabled();
});


test('Sign Up button is disabled when email is empty and other fields are filled', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
  
    // Fill out other fields
    await userEvent.type(screen.getByLabelText(/first name/i), 'John');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(screen.getByTestId('password-field'), 'Valid1Password!');
    await userEvent.type(screen.getByTestId('confirm-password-field'), 'Valid1Password!');
  
    // Ensure email field is empty
    await userEvent.clear(screen.getByLabelText(/email address/i));
  
    // Check if the button is disabled
    await waitFor(() => {
      const signUpButton = screen.getByRole('button', { name: /sign up/i });
      expect(signUpButton).toBeDisabled();
    });
  });
  
  test('Sign Up button is disabled when passwords do not match', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
  
    // Fill out fields with mismatched passwords
    await userEvent.type(screen.getByLabelText(/first name/i), 'John');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(screen.getByTestId('email-address'), 'john.doe@example.com');
    await userEvent.type(screen.getByTestId('password-field'), 'Valid1Password!');
    await userEvent.type(screen.getByTestId('confirm-password-field'), 'Valid1Password?');
  
  
    // Check if the button is disabled
    await waitFor(() => {
      const signUpButton = screen.getByRole('button', { name: /sign up/i });
      expect(signUpButton).toBeDisabled();
    });
  });
  

test('Sign Up button is disabled when password is empty and other fields are filled', async () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );

  // Fill out other fields
  await userEvent.type(screen.getByLabelText(/first name/i), 'John');
  await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
  await userEvent.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
  await userEvent.type(screen.getByLabelText(/confirm password/i), 'Valid1Password!');

  // Check if the button is disabled
  await waitFor(() => {
    const signUpButton = screen.getByRole('button', { name: /sign up/i });
    expect(signUpButton).toBeDisabled();
  });
});



test('Sign Up button is disabled when email is invalid', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
  
    // Fill out fields with an invalid email
    await userEvent.type(screen.getByLabelText(/first name/i), 'John');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(screen.getByTestId('email-address'), 'invalid-email');
    await userEvent.type(screen.getByTestId('password-field'), 'Valid1Password!');
    await userEvent.type(screen.getByTestId('confirm-password-field'), 'Valid1Password!');
  
    // Check if the button is disabled
    await waitFor(() => {
      const signUpButton = screen.getByRole('button', { name: /sign up/i });
      expect(signUpButton).toBeDisabled();
    });
  });
  


  test('Sign Up button is disabled when first name is less than 3 characters', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
  
    // Fill out fields with a short first name
    await userEvent.type(screen.getByLabelText(/first name/i), 'Jo');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(screen.getByTestId('email-address'), 'john.doe@example.com');
    await userEvent.type(screen.getByTestId('password-field'), 'Valid1Password!');
    await userEvent.type(screen.getByTestId('confirm-password-field'), 'Valid1Password!');
    // Check if the button is disabled
    await waitFor(() => {
      const signUpButton = screen.getByRole('button', { name: /sign up/i });
      expect(signUpButton).toBeDisabled();
    });
  });
  
  test('Sign Up button is disabled when password is too short', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
  
    // Fill out fields with a short password
    await userEvent.type(screen.getByLabelText(/first name/i), 'John');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(screen.getByTestId('email-address'), 'john.doe@example.com');
    await userEvent.type(screen.getByTestId('password-field'), 'Short1');
    await userEvent.type(screen.getByTestId('confirm-password-field'), 'Short1');
  
    // Check if the button is disabled
    await waitFor(() => {
      const signUpButton = screen.getByRole('button', { name: /sign up/i });
      expect(signUpButton).toBeDisabled();
    });
  });
  
  test('Sign Up button is disabled when password lacks special characters', async () => {
    render(
      <Router>
        <SignUp />
      </Router>
    );
  
    // Fill out fields with a password lacking special characters
    await userEvent.type(screen.getByLabelText(/first name/i), 'John');
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
    await userEvent.type(screen.getByTestId('email-address'), 'john.doe@example.com');
    await userEvent.type(screen.getByTestId('password-field'), 'ValidPassword');
    await userEvent.type(screen.getByTestId('confirm-password-field'), 'ValidPassword');
  
    // Check if the button is disabled
    await waitFor(() => {
      const signUpButton = screen.getByRole('button', { name: /sign up/i });
      expect(signUpButton).toBeDisabled();
    });
  });


//   test('Password field shows error message when password is empty', async () => {
//     render(
//       <Router>
//         <SignUp />
//       </Router>
//     );
  
//     // Fill out other fields
//     await userEvent.type(screen.getByLabelText(/first name/i), 'John');
//     await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
//     await userEvent.type(screen.getByLabelText(/email address/i), 'john.doe@example.com');
//     await userEvent.type(screen.getByLabelText(/confirm password/i), 'Valid1Password!');
  
//     // Submit the form
//     fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
  
//     // Check for error message on password field
//     await waitFor(() => {
//       expect(screen.getByText(/password must be at least 8 characters long/i)).toBeInTheDocument();
//     });
//   });
  

//   test('Sign Up button is enabled after correcting errors', async () => {
//     render(
//       <Router>
//         <SignUp />
//       </Router>
//     );
  
//     // Fill out some fields with invalid data first
//     await userEvent.type(screen.getByLabelText(/first name/i), 'John');
//     await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
//     await userEvent.type(screen.getByTestId('email-address'), 'invalid-email');
//     await userEvent.type(screen.getByTestId('password-field'), 'Valid1Password!');
//     await userEvent.type(screen.getByTestId('confirm-password-field'), 'Valid1Password!');
  
  
//     // Check if the button is disabled
//     await waitFor(() => {
//       const signUpButton = screen.getByRole('button', { name: /sign up/i });
//       expect(signUpButton).toBeDisabled();
//     });
  
//     // Correct the errors
//     await userEvent.type(screen.getByLabelText(/first name/i), 'John');
//     await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
//     await userEvent.clear(screen.getByTestId('email-address')),
//     await userEvent.type(screen.getByTestId('email-address'), 'john.doe@example.com');
  
//     // Check if the button is enabled now
//     await waitFor(() => {
//       const signUpButton = screen.getByRole('button', { name: /sign up/i });
//       expect(signUpButton).toBeEnabled();
//     });
//   });
  
//   test('Sign Up button is disabled when password is empty and other fields are filled', async () => {
//     render(
//       <Router>
//         <SignUp />
//       </Router>
//     );
  
//     // Fill out all fields except for the password
//     await userEvent.type(screen.getByLabelText(/first name/i), 'John');
//     await userEvent.type(screen.getByLabelText(/last name/i), 'Doe');
//     await userEvent.type(screen.getByTestId('email-address'), 'john.doe@example.com');
//     await userEvent.type(screen.getByTestId('password-field'), 'Valid1Password!');
//     await userEvent.type(screen.getByTestId('confirm-password-field'), 'Valid1Password!');
  
//     // Check if the button is disabled
//     await waitFor(() => {
//       const signUpButton = screen.getByRole('button', { name: /sign up/i });
//       expect(signUpButton).toBeEnabled();
//     });
//   });



