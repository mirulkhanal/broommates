import styled, { css, keyframes } from 'styled-components';
import { ToastMessage } from '.';

// Animation for toast notifications
const slideIn = keyframes`
  from {
    right: -100%;
    opacity: 0;
  }
  to {
    right: 0;
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    right: 0;
    opacity: 1;
  }
  to {
    right: -100%;
    opacity: 0;
  }
`;

// Container for the entire notification list
export const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Toast = styled.div<ToastMessage>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ type }) =>
    type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#FF9800'};
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  min-width: 250px;
  max-width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${({ isLeaving }) =>
    isLeaving
      ? css`
          ${slideOut} 0.3s ease forwards
        `
      : css`
          ${slideIn} 0.3s ease forwards
        `};

  & > button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
`;
