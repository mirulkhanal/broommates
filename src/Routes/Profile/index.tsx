import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchUserBoards,
  updateUserProfile,
  uploadProfilePicture,
  UserProfile,
} from '../../lib/firebase';
import useAuth from '../../hooks/useAuth';
import {
  ProfileContainer,
  ProfileHeader,
  ProfileImage,
  ProfileDetails,
  ProfileInfo,
  EditProfileButton,
  BoardsGrid,
  BoardItem,
} from './profileComponents';

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [boards, setBoards] = useState<any[]>([]);
  const [editing, setEditing] = useState(false);
  const [newProfileData, setNewProfileData] = useState<Partial<UserProfile>>({
    displayName: '',
    bio: '',
    age: undefined,
    photoURL: '',
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const userBoards = await fetchUserBoards(userId!);
        setBoards(userBoards);
      } catch (error) {
        console.error('Error fetching user boards: ', error);
      }
    };

    if (user && user.uid === userId) {
      console.log('CHECK USER: ', user && user.uid === userId);
      fetchBoards();
    } else {
      navigate('/login');
    }
  }, [userId, user, navigate]);

  useEffect(() => {
    if (user) {
      setNewProfileData({
        displayName: user.displayName || '',
        bio: user.bio || '',
        age: user.age,
        photoURL: user.photoURL || '',
      });
    }
  }, [user]);

  const handleEditProfile = () => setEditing(true);

  const handleSaveProfile = async () => {
    try {
      let updatedPhotoURL = user?.photoURL;
      if (profilePicture) {
        updatedPhotoURL = await uploadProfilePicture(profilePicture, userId!);
      }
      const updatedProfileData = {
        ...newProfileData,
        age: newProfileData.age ? Number(newProfileData.age) : undefined,
        photoURL: updatedPhotoURL!,
      };
      await updateUserProfile(userId!, updatedProfileData);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  };

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileImage src={user.photoURL} alt='Profile Picture' />
        <ProfileDetails>
          {editing ? (
            <>
              <input
                type='text'
                value={newProfileData.displayName ?? ''}
                onChange={(e) =>
                  setNewProfileData({
                    ...newProfileData,
                    displayName: e.target.value,
                  })
                }
              />
              <textarea
                value={newProfileData.bio ?? ''}
                onChange={(e) =>
                  setNewProfileData({
                    ...newProfileData,
                    bio: e.target.value,
                  })
                }
              />
              <input
                type='number'
                value={
                  newProfileData.age !== undefined
                    ? newProfileData.age.toString()
                    : ''
                }
                onChange={(e) =>
                  setNewProfileData({
                    ...newProfileData,
                    age: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
              />
              <input type='file' onChange={handleFileChange} />
              <button onClick={handleSaveProfile}>Save Profile</button>
            </>
          ) : (
            <>
              <h1>{user.displayName}</h1>
              <ProfileInfo>
                <p>{user.bio}</p>
                <p>Age: {user.age}</p>
              </ProfileInfo>
              {user && user.uid === userId && (
                <EditProfileButton onClick={handleEditProfile}>
                  Edit Profile
                </EditProfileButton>
              )}
            </>
          )}
        </ProfileDetails>
      </ProfileHeader>
      <BoardsGrid>
        {boards.map((board) => (
          <BoardItem key={board.id}>
            <p>{board.title}</p>
          </BoardItem>
        ))}
      </BoardsGrid>
    </ProfileContainer>
  );
};

export default Profile;
