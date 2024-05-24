import React, { useState } from 'react';
import SelectOption from './SelectOption';
import { Metrics, MetricsArray, Priority, PriorityArray } from '../../data';
import styled from 'styled-components';

interface FormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
}

const FormContainer = styled.form`
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

const Row = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`;

const Input = styled.input`
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

const TextArea = styled.textarea`
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

const Button = styled.button`
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

const CancelButton = styled(Button)`
  background-color: #f44336;
  &:hover {
    background-color: #d32f2f;
  }
  &:active {
    background-color: #b71c1c;
  }
`;

const Form: React.FC<FormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    listItem: '',
    quantityAmount: '',
    quantityMetric: Metrics.KG,
    description: '',
    price: '',
    priority: Priority.Immediate,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSelectChange = (name: string, selectedValue: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: selectedValue }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !formData ||
      !formData.quantityAmount ||
      formData.priority > 0 ||
      !formData.listItem
    ) {
      // TODO: Error management
      return null;
    }
    onSubmit({
      listItem: formData.listItem,
      quantity: {
        amount: formData.quantityAmount,
        metric: formData.quantityMetric,
      },
      description: formData.description,
      price: formData.price,
      priority: formData.priority,
    });

    setFormData({
      listItem: '',
      quantityAmount: '',
      quantityMetric: Metrics.KG,
      description: '',
      price: '',
      priority: Priority.Immediate,
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Input
        type='text'
        name='listItem'
        value={formData.listItem}
        onChange={handleInputChange}
        placeholder='Item name'
      />
      <Row>
        <Input
          type='number'
          name='quantityAmount'
          value={formData.quantityAmount}
          onChange={handleInputChange}
          placeholder='Quantity'
        />
        <SelectOption
          options={MetricsArray}
          defaultValue={MetricsArray[0]}
          onChange={(value) => handleSelectChange('quantityMetric', value)}
        />
      </Row>
      <TextArea
        name='description'
        value={formData.description}
        onChange={handleInputChange}
        placeholder='Description'
      />
      <Row>
        <Input
          type='number'
          name='price'
          value={formData.price}
          onChange={handleInputChange}
          placeholder='Price'
        />
        <SelectOption
          options={PriorityArray}
          defaultValue={PriorityArray[0]}
          onChange={(value) => handleSelectChange('priority', value)}
        />
      </Row>
      <Row>
        <ButtonContainer>
          <CancelButton type='button' onClick={onCancel}>
            Cancel
          </CancelButton>
          <Button type='submit'>Save</Button>
        </ButtonContainer>
      </Row>
    </FormContainer>
  );
};

export default Form;
