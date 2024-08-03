// components/NewJobForm.tsx
import React, { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';

interface NewJobFormProps {
  onAddJob: (id: string, name: string) => void;
}

const NewJobForm: React.FC<NewJobFormProps> = ({ onAddJob }) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');

  const handleAddJob = () => {
    if (id && name) {
      onAddJob(id, name);
      setId('');
      setName('');
    }
  };

  return (
    <Box border="1px solid black" borderRadius="md" p={4}>
      <VStack align="start" spacing={4}>
        <Text>New Job:</Text>
        <Input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button onClick={handleAddJob}>Enter</Button>
      </VStack>
    </Box>
  );
};

export default NewJobForm;
