import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../lib/firebase';

// Authentication hook to manage user state
const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [profileComplete, setProfileComplete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userProfile = await fetchUserProfile(currentUser.uid);
        setUser(currentUser);
        setProfileComplete(userProfile?.profileComplete || false);
        localStorage.setItem('user', JSON.stringify(currentUser));
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
