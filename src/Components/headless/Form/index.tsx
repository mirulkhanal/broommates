import React, { useState } from 'react';
import SelectOption from './SelectOption';
import { Metrics, MetricsArray, Priority, PriorityArray } from '../../../types';
import {
  Button,
  ButtonContainer,
  CancelButton,
  FormContainer,
  FormProps,
  Input,
  Row,
  TextArea,
} from './formComponent';

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
