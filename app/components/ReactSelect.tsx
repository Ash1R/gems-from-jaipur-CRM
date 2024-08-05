// components/ReactSelect.tsx
import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { chakra } from '@chakra-ui/react';

const ChakraCreatableSelect = chakra(CreatableSelect);

interface Option {
  value: string;
  label: string;
}

interface ReactSelectProps {
  options: Option[];
  value: Option | null;
  onChange: (value: Option | null) => void;
  placeholder?: string;
}

const ReactSelect: React.FC<ReactSelectProps> = ({ options, value, onChange, placeholder }) => {
  return (
    <ChakraCreatableSelect
      options={options}
      value={value}
      onChange={(selectedOption) => onChange(selectedOption as Option | null)}
      isClearable
      placeholder={placeholder}
    />
  );
};

export default ReactSelect;
