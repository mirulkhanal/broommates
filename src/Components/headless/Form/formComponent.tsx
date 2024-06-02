import styled from 'styled-components';

export interface FormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #242424;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

export const Row = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #00ccff;
  background-color: #333;
  color: #e0e0e0;
  font-size: 1em;
  outline: none;

  &::placeholder {
    color: #a0a0a0;
  }
`;

export const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #00ccff;
  background-color: #333;
  color: #e0e0e0;
  font-size: 1em;
  outline: none;
  min-height: 100px;

  &::placeholder {
    color: #a0a0a0;
  }
`;

export const Button = styled.button`
  width: 90%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #00ccff;
  color: #242424;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #008fb3;
    transform: scale(1.05);
  }

  &:active {
    background-color: #005f73;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #f44336;
  &:hover {
    background-color: #d32f2f;
  }
  &:active {
    background-color: #b71c1c;
  }
`;
