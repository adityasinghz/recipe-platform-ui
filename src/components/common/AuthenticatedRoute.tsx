import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthenticatedRouteProps {
  children: ReactNode;
}

const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
};

export default AuthenticatedRoute;
