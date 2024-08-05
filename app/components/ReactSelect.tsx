// components/ReactSelect.tsx
import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { chakra } from '@chakra-ui/react';

const ChakraCreatableSelect = chakra(CreatableSelect);

interface ReactSelectProps {
  options: { value: string; label: string }[];
  value: { value: string; label: string };
  onChange: (value: { value: string; label: string }) => void;
  placeholder?: string; // Add the placeholder prop
}

const ReactSelect: React.FC<ReactSelectProps> = ({ options, value, onChange, placeholder }) => {
  return (
    <ChakraCreatableSelect
      options={options}
      value={value}
      onChange={(selectedOption) => onChange(selectedOption || { value: '', label: '' })}
      isClearable
      placeholder={placeholder} // Pass the placeholder prop
    />
  );
};

export default ReactSelect;
