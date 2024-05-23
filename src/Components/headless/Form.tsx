import React, { useState } from 'react';
import SelectOption from './SelectOption'; 

// Assuming SelectOption is in the same directory as Form
import { Metrics, MetricsArray, Priority, PriorityArray } from '../../data'; 

// Import Metrics and Priority from your data file
interface FormProps {
  onSubmit: (formData: any) => void; // Adjust the type of formData as per your needs
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
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

    // Optionally, you can reset the form after submission
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
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='listItem'
        value={formData.listItem}
        onChange={handleInputChange}
        placeholder='Enter item'
      />
      <input
        type='number'
        name='quantityAmount'
        value={formData.quantityAmount}
        onChange={handleInputChange}
        placeholder='Quantity amount'
      />
      <SelectOption
        options={MetricsArray}
        defaultValue={MetricsArray[0]}
        onChange={(value) => handleSelectChange('quantityMetric', value)}
      />
      <textarea
        name='description'
        value={formData.description}
        onChange={handleInputChange}
        placeholder='Description'
      />
      <input
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
      <button type='submit'>Submit</button>
    </form>
  );
};

export default Form;
