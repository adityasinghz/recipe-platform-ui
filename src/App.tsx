// src/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './components/signInPage.tsx';
import SignUp from './components/signUpPage.tsx';
import ForgotPassword from './components/forgotPassword.tsx';
import Profile from './components/profileComp.tsx';
import DashBoard from './components/dashBoard.tsx';
import Test from './components/test.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { ToastContainer } from 'react-toastify';
const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticatedRoute key="signin"><SignIn /></AuthenticatedRoute>
  },
  {
    path: "/login",
    element: <AuthenticatedRoute key="login"><SignIn /></AuthenticatedRoute>
  },
  {
    path: "/register",
    element: <AuthenticatedRoute key="signup"><SignUp /></AuthenticatedRoute>
  },
  {
    path: "/forgotpassword",
    element: <AuthenticatedRoute key="forgotpassword"><ForgotPassword /></AuthenticatedRoute>
  },
  {
    path: "/aboutTeamKailash",
    element: <Profile key="profile" />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute key="dashboard"><DashBoard /></ProtectedRoute>
  },
  {
    path: '/test',
    element: <Test key="test" />
  }
]);

function App() {
  return (
    <><ToastContainer/><RouterProvider router={routes} /></>
  );
}

export default App;
