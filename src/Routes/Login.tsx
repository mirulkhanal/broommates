import { useEffect } from 'react';
import { signInWithGoogle } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.email) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle sign-in error if needed
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;
