import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ReactNode } from 'react';

// Private route component
const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return user ? <>{children}</> : <Navigate to='/login' />;
};

export default PrivateRoute;
