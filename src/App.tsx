import SignIn from './components/signInPage.tsx';
import SignUp from './components/signUpPage.tsx';
import ForgotPassword from './components/forgotPassword.tsx';
import Profile from './components/profileComp.tsx';
import SideBar from './components/sideBar.tsx';
import Test from './components/test.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


const routes = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/login",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <SignUp />
  },
  {
    path:"/forgotpassword",
    element: <ForgotPassword/>
  },
  {
    path: "/aboutTeamKailash",
    element: <Profile/>
  },
  {
    path:'/dashboard',
    element:<SideBar/>
  },
  {
    path:'/test',
    element:<Test/>
  }
]);


function App() {
  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    <ToastContainer />
  </>
  );
}

export default App;
