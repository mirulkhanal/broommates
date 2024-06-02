import styled, { keyframes } from 'styled-components';

export const neonAnimation = keyframes`
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

export const DropdownMenu = styled.div`
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

export const NavbarContainer = styled.nav`
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

export const Brand = styled.div`
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

export const UserSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid rgba(56, 178, 172, 1);
  margin-right: 10px;
`;

export const HamburgerMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;
  }
`;

export const HamburgerBar = styled.div`
  width: 25px;
  height: 3px;
  background-color: #ffffff;
  margin: 4px 0;
`;
