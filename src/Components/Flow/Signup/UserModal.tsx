import { useState, useEffect } from 'react';
import {
  ModalContainer,
  ModalContent,
  FormField,
  SubmitButton,
  ProfileImage,
} from './userModalcomponents';
import {
  fetchUserProfile,
  updateUserProfile,
  uploadProfilePicture,
} from '../../../lib/firebase';

interface ProfileSetupModalProps {
  visible: boolean;
  onClose: () => void;
  userId: string;
}

const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({
  visible,
  onClose,
  userId,
}) => {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [photoURL, setPhotoURL] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File | null>(null);

  useEffect(() => {
    // Fetch user profile details and populate the state
    const fetchUserProfileDetails = async () => {
      const userProfile = await fetchUserProfile(userId);
      if (userProfile) {
        setName(userProfile.displayName || '');
        setAge(userProfile.age?.toString() || '');
        setBio(userProfile.bio || '');
        setPhotoURL(userProfile.photoURL || '');
      }
    };

    fetchUserProfileDetails();
  }, [userId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let uploadedPhotoURL = photoURL;
      if (profileImage) {
        uploadedPhotoURL = await uploadProfilePicture(profileImage, userId);
      }
      await updateUserProfile(userId, {
        name,
        age: parseInt(age, 10),
        bio,
        photoURL: uploadedPhotoURL,
        profileComplete: true,
      });
      onClose();
    } catch (error) {
      console.error('Error updating profile: ', error);
    }
  };

  return (
    <ModalContainer style={{ display: visible ? 'flex' : 'none' }}>
      <ModalContent>
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <label>Full Name</label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <label>Age</label>
            <input
              type='number'
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <label>Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <label>Profile Picture</label>
            {photoURL && <ProfileImage src={photoURL} alt='Profile' />}
            <input type='file' accept='image/*' onChange={handleImageChange} />
          </FormField>
          <SubmitButton type='submit'>Save Profile</SubmitButton>
        </form>
      </ModalContent>
    </ModalContainer>
  );
};

export default ProfileSetupModal;
