import { useEffect, useState } from 'react';
import { signInWithGoogle } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import ProfileSetupModal from '../../Components/Flow/Signup/UserModal';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  useEffect(() => {
    if (user && !showProfileSetup) {
      navigate('/');
    }
  }, [user, navigate, showProfileSetup]);

  const handleSignIn = async () => {
    try {
      const {}= await signInWithGoogle();
      if (userProfile && !userProfile.profileComplete) {
        setShowProfileSetup(true);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleProfileSetupClose = () => {
    setShowProfileSetup(false);
    navigate('/');
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {showProfileSetup && user && (
        <ProfileSetupModal
          visible={showProfileSetup}
          onClose={handleProfileSetupClose}
          userId={user.uid}
        />
      )}
    </div>
  );
};

export default Login;
