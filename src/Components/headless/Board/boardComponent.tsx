import styled from 'styled-components';

// Styled components
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #00ccff; /* Neon blinking teal border color */
  background-color: #242424; /* Dark background color */
  color: #ffffff; /* Text color */
  outline: none;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #00ccff; /* Neon blinking teal border color */
    box-shadow: 0 0 10px #00ccff; /* Neon blinking teal shadow */
  }
`;

export const Select = styled.select`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #00ccff; /* Neon blinking teal border color */
  background-color: #242424; /* Dark background color */
  color: #ffffff; /* Text color */
  outline: none;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #00ccff; /* Neon blinking teal border color */
    box-shadow: 0 0 10px #00ccff; /* Neon blinking teal shadow */
  }
`;

export const Option = styled.option`
  background-color: #242424; /* Dark background color */
  color: #ffffff; /* Text color */
`;

export const Label = styled.label`
  color: #00ccff; /* Neon blinking teal text color */
  margin-bottom: 10px;
`;

export interface BoardFormProps {
  boardData: { title: string; type: string };
  setBoardData: React.Dispatch<
    React.SetStateAction<{ title: string; type: string }>
  >;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
