import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useTimeout from '../hooks/useTimeout'; // Import the useTimeout hook
import styled, { keyframes } from 'styled-components';
import { signInWithGoogle } from '../lib/firebase';

const neonAnimation = keyframes`
  0% {
    border-color: rgba(56, 178, 172, 0.5);
    box-shadow: 0 0 10px rgba(56, 178, 172, 0.5);
  }
  50% {
    border-color: rgba(56, 178, 172, 1);
    box-shadow: 0 0 20px rgba(56, 178, 172, 1);
  }
  100% {
    border-color: rgba(56, 178, 172, 0.5);
    box-shadow: 0 0 10px rgba(56, 178, 172, 0.5);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  background-color: #242424;
  border-radius: 8px;
  overflow: hidden;
  z-index: 100;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Darker box shadow on hover */

  p,
  button {
    padding: 10px 20px;
    margin: 0;
    text-align: left;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1em;
    color: white;

    &:hover {
      background-color: #242424; /* Change to match dropdown background */
      color: #f0f0f0; /* Change to match text color on hover */
    }
  }

  p:hover,
  button:hover {
    animation: ${neonAnimation} 1s infinite alternate; /* Neon animation */
  }
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #242424;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 10px 50px;
  }
`;

const Brand = styled.div`
  position: relative;
  font-size: 1.5em;
  font-weight: bold;
  color: #ffffff;
  padding: 5px;
  background: linear-gradient(to right, #ff00ff, #00ffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to right, #ff00ff, #00ffff);
    background-size: 200% 200%;
    border-radius: 8px;
    z-index: -1;
    transition: background-position 0.5s ease-in-out;
    animation: ${neonAnimation} 2s infinite alternate;
  }

  &:hover::before {
    background-position: 100% 50%;
  } 
`;

const UserSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid rgba(56, 178, 172, 1);
  margin-right: 10px;
`;

const HamburgerMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`;

const HamburgerBar = styled.div`
  width: 25px;
  height: 3px;
  background-color: #ffffff;
  margin: 4px 0;
`;

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const auth = getAuth();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { set: setDropdownTimeout, clear: clearDropdownTimeout } = useTimeout(); // Use the useTimeout hook

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error: any) {
      console.error('Error signing out: ', error?.message);
    }
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleMouseEnter = () => {
    clearDropdownTimeout();
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownTimeout(() => setIsDropdownOpen(false), 300);
  };

  return (
    <NavbarContainer>
      <Brand>BroomMates</Brand>
      {/* <Menu>Menus</Menu> */}
      {user ? (
        <UserSection
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <Avatar src={user.photoURL as string} alt='User Avatar' />
          {isDropdownOpen && (
            <DropdownMenu
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <p>{user.displayName}</p>
              <p>{user.email}</p>
              <button onClick={handleProfile}>Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </DropdownMenu>
          )}
        </UserSection>
      ) : (
        <HamburgerMenu
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <HamburgerBar />
          <HamburgerBar />
          <HamburgerBar />
          {isDropdownOpen && (
            <DropdownMenu
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <button onClick={async () => await signInWithGoogle()}>
                Sign in with Google
              </button>
            </DropdownMenu>
          )}
        </HamburgerMenu>
      )}
    </NavbarContainer>
  );
};

export default Navbar;
