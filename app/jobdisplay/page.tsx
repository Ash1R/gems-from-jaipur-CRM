'use client';

import { useEffect, useState } from 'react';
import { Box, VStack, HStack, Text, Heading, Divider } from '@chakra-ui/react';
import ReactSelect, { Option } from '../components/ReactSelect';
import JobCard from '../components/JobCard';
import NewJobForm from '../components/NewJobForm';
import axios from 'axios';

const initialOptions: Option[] = [
  { value: "Gold", label: "Gold" },
  { value: "Silver", label: "Silver" },
  { value: "Platinum", label: "Platinum" },
  { value: "Palladium", label: "Palladium" }
];

const IndexPage = () => {
  const [jobs, setJobs] = useState<{ id: string; name: string, castings: any[], edits: any[], diamonds: any[] }[]>([]);
  const [selectedId, setSelectedId] = useState<Option | null>(null);
  const [selectedName, setSelectedName] = useState<Option | null>(null);
  const [options, setOptions] = useState(initialOptions);

  useEffect(() => {
    axios.get('/api/jobs')
      .then(response => {
        setJobs(response.data);
      });
  }, []);

  const handleAddJob = (id: string, name: string) => {
    axios.post('/api/jobs', { id, name, castings: [], edits: [], diamonds: [] })
      .then(response => {
        setJobs([...jobs, response.data]);
      });
  };

  const handleDeleteJob = (id: string) => {
    axios.delete('/api/jobs', { data: { id } })
      .then(() => {
        setJobs(jobs.filter(job => job.id !== id));
      });
  };

  return (
    <Box p={4}>
      <HStack align="start" spacing={8}>
        <Divider orientation='vertical'/>
        {/* Left Section */}
        <VStack align="start" spacing={8} w="30%">
          {/* Search Section */}
          <Box>
            <Text mb={2}>Search:</Text>
            <HStack spacing={4}>
              <VStack spacing={4}>
                <Box w="full">
                  <Text>ID:</Text>
                  <ReactSelect
                    options={options}
                    value={selectedId}
                    onChange={setSelectedId}
                    placeholder="Select ID"
                  />
                </Box>
                <Box w="full">
                  <Text>Name:</Text>
                  <ReactSelect
                    options={options}
                    value={selectedName}
                    onChange={setSelectedName}
                    placeholder="Select Name"
                  />
                </Box>
              </VStack>
            </HStack>
          </Box>

          {/* New Job Form */}
          <NewJobForm onAddJob={handleAddJob} />
        </VStack>

        {/* Right Section */}
        <VStack spacing={4} w="70%">
          <Heading textAlign="center" mb={7} size="xl">
            Jobs
          </Heading>
          {jobs.map((job, index) => (
            <JobCard
              key={index}
              id={job.id}
              name={job.name}
              castings={job.castings}
              edits={job.edits}
              diamonds={job.diamonds}
              onDelete={() => handleDeleteJob(job.id)}
            />
          ))}
        </VStack>
      </HStack>
    </Box>
  );
};

export default IndexPage;
