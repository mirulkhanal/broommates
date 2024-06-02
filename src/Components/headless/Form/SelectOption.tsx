import React, { useState } from 'react';

interface SelectOptionProps {
  options: string[];
  defaultValue?: string;
  onChange: (selectedValue: string) => void;
}

const SelectOption: React.FC<SelectOptionProps> = ({
  options,
  defaultValue,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue || ''
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <select value={selectedValue} onChange={handleSelectChange}>
      <option value=''>Select an option</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
