import styled from 'styled-components';

export const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

export const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
`;

export const ProfileDetails = styled.div`
  flex: 1;
`;

export const ProfileInfo = styled.div`
  margin-bottom: 10px;
  p {
    margin: 5px 0;
  }
`;

export const EditProfileButton = styled.button`
  background-color: #3897f0;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const BoardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
`;

export const BoardItem = styled.div`
  background: #f1f1f1;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
`;
