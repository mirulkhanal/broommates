import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Author } from '../data';

// Authentication hook to manage user state
// TODO: Remember to use jsDoc to document this and all the other hooks
const useAuth = () => {
  const [user, setUser] = useState<Author | null>(
    JSON.parse(localStorage.getItem('user') as string)
  );

  const auth = getAuth();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuth;
