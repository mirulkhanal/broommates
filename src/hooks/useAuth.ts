import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { fetchUserProfile, UserProfile } from '../lib/firebase';

const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [profileComplete, setProfileComplete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth(); // Get the auth instance

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userProfile = await fetchUserProfile(currentUser.uid);
        if (userProfile) {
          setUser(userProfile);
          setProfileComplete(userProfile.profileComplete);
          localStorage.setItem('user', JSON.stringify(userProfile));
        } else {
          setUser(null);
          setProfileComplete(false);
          localStorage.removeItem('user');
        }
      } else {
        setUser(null);
        setProfileComplete(false);
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, profileComplete, loading };
};

export default useAuth;
