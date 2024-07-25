// src/App.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignIn from './components/signin/signInPage.tsx';
import SignUp from './components/signup/signUpPage.tsx';
import ForgotPassword from './components/forgotpassword/forgotPassword.tsx';
import Profile from './components/common/profileComp.tsx';
import DashBoard from './components/dashboard/dashBoard.tsx';
import ProtectedRoute from './components/common/ProtectedRoute.tsx';
import AuthenticatedRoute from './components/common/AuthenticatedRoute.tsx';
import { ToastContainer } from 'react-toastify';
import SomeComponent from './components/common/test.tsx';
import OtpPage from './components/signup/otpPage.tsx';
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
    element: <SomeComponent key="test" />
  },
  {
    path:'/verification',
    element: <OtpPage/>
  }
]);

function App() {
  return (
    <><ToastContainer/><RouterProvider router={routes} /></>
  );
}

export default App;
