import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTimeout from '../../hooks/useTimeout';
import { signInWithGoogle } from '../../lib/firebase';
import {
  Avatar,
  Brand,
  DropdownMenu,
  HamburgerBar,
  HamburgerMenu,
  NavbarContainer,
  UserSection,
} from './navbarComponents';

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
