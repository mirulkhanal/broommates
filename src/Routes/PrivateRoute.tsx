import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ReactNode } from 'react';

// Private route component
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const user = useAuth();
  return !user ? <Navigate to='/login' /> : <>{children}</>;
};

export default PrivateRoute;
