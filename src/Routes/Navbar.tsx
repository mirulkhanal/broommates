import { useState } from 'react';
import { User, getAuth, signOut } from 'firebase/auth';
import useAuth from '../hooks/useAuth';
import styled from 'styled-components';

export interface INavbarProps {
  // user: User;
}

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  background-color: #c0c0c0;
  width: 100%;
`;

const Brand = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const Menu = styled.div`
  flex-grow: 1;
  text-align: center;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Navbar = ({}: INavbarProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // get authentication details from firebase
  const auth = getAuth();
  const user = useAuth() as User;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
    } catch (error: any) {
      console.error('Error signing out: ', error?.message);
    }
  };

  return (
    <NavbarContainer>
      <Brand>BroomMates</Brand>
      <Menu>Menus</Menu>
      {auth && user && (
        <UserSection
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}>
          <Avatar src={user.photoURL as string} alt='User Avatar' />
          {isDropdownOpen && (
            <div className='dropdown-menu'>
              <p>{user.displayName}</p>
              <p>{user.email}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </UserSection>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
