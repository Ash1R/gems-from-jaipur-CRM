// components/ReactSelect.tsx
import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { chakra } from '@chakra-ui/react';

const ChakraCreatableSelect = chakra(CreatableSelect);

interface ReactSelectProps {
  options: { value: string; label: string }[];
  value: { value: string; label: string };
  onChange: (value: { value: string; label: string }) => void;
}

const ReactSelect: React.FC<ReactSelectProps> = ({ options, value, onChange }) => {
  return (
    <ChakraCreatableSelect
      options={options}
      value={value}
      onChange={(selectedOption) => onChange(selectedOption || { value: '', label: '' })}
      isClearable
    />
  );
};

export default ReactSelect;
