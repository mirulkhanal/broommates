import { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';

export type ModalProps = {
  onClose: () => void;
  onSave: (e: any) => void;
  children: ReactNode;
};

export const modalBounceIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  animation: fadeInOverlay 0.3s ease forwards;

  @keyframes fadeInOverlay {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background-color: #242424; /* Dark background color */
  padding: 40px; /* Increased padding */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5); /* Neon blinking teal color shadow */
  animation: ${modalBounceIn} 0.5s ease forwards;
  width: 60%; /* Adjusted width */
  max-width: 600px; /* Max width */
  height: 60%; /* Adjusted height */
  max-height: 400px; /* Max height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  /* Add more styling as needed */
`;

export const getButtonColor = (
  btnType?: 'primary' | 'secondary' | 'danger' | 'default'
) => {
  switch (btnType) {
    case 'primary':
      return '#00ff00'; // Shining green color
    case 'secondary':
      return '#ffcc00'; // Off yellowish color
    case 'danger':
      return '#ff0000'; // Scarlett red color
    default:
      return '#00ccff'; // Neon blinking teal color (default)
  }
};
interface ButtonProps {
  btnType?: 'primary' | 'secondary' | 'danger' | 'default';
}
export const Button = styled.button<ButtonProps>`
  flex: 1;
  background-color: ${(props) => getButtonColor(props.btnType)};
  color: ${(props) =>
    props.btnType === 'danger'
      ? 'white'
      : props.btnType === 'default'
      ? 'black'
      : 'white'}; /* Text color */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => {
      switch (props.btnType) {
        case 'primary':
          return '#00cc00'; // Darker green color on hover
        case 'secondary':
          return '#cca300'; // Darker yellow color on hover
        case 'danger':
          return '#cc0000'; // Darker red color on hover
        default:
          return '#008fb3'; // Darker neon blinking teal color on hover
      }
    }};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
`;
