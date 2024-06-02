import styled from 'styled-components';

// Define the styled component for the action button
export const FloatingActionButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #00ccff;
  color: #242424;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  transition: transform 0.6s ease-in-out, background-color 0.3s ease-in-out;

  &:hover {
    transform: rotate(360deg);
    background-color: #008fb3;
  }
`;

export const Tooltip = styled.div`
  position: absolute;
  bottom: 90px;
  right: 10px;
  background-color: #00ccff;
  color: #242424;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.8em;
  white-space: nowrap;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;

  ${FloatingActionButton}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;
