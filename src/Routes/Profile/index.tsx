import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
  const navigate = useNavigate();
  const { user, profileComplete } = useAuth();

  const [bio, setBio] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (profileComplete) {
      navigate('/');
    }
  }, [user, navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      try {
        await setDoc(
          doc(db, 'users', user.uid),
          {
            bio,
            age,
            profileComplete: true,
          },
          { merge: true }
        );
        navigate('/dashboard');
      } catch (error) {
        console.error('Error updating profile: ', error);
      }
    }
  };

  return (
    <div>
      <h1>Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type='number'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
