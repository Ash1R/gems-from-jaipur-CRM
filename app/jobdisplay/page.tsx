'use client';

import { useEffect, useState } from 'react';
import { Box, VStack, HStack, Text, Heading, Divider } from '@chakra-ui/react';
import ReactSelect, { Option } from '../components/ReactSelect';
import JobCard from '../components/JobCard';
import NewJobForm from '../components/NewJobForm';

const IndexPage = () => {
  const [jobs, setJobs] = useState<
    {
      id: string;
      name: string;
      castings: any[];
      edits: any[];
      diamonds: any[];
    }[]
  >([]);
  const [selectedId, setSelectedId] = useState<Option | null>(null);
  const [selectedName, setSelectedName] = useState<Option | null>(null);
  const [idOptions, setIdOptions] = useState<Option[]>([]);
  const [nameOptions, setNameOptions] = useState<Option[]>([]);

  useEffect(() => {
    fetch('/api/jobs')
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);

        const ids = data.map((job: { id: string }) => ({
          value: job.id,
          label: job.id,
        }));
        setIdOptions(ids);

        const names = data.map((job: { name: string }) => ({
          value: job.name,
          label: job.name,
        }));
        setNameOptions(names);
      });
  }, []);

  const handleAddJob = (id: string, name: string) => {
    fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, castings: [], edits: [], diamonds: [] }),
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs([...jobs, data]);
        setIdOptions([...idOptions, { value: data.id, label: data.id }]);
        setNameOptions([
          ...nameOptions,
          { value: data.name, label: data.name },
        ]);
      });
  };

  const handleDeleteJob = (id: string) => {
    fetch('/api/jobs', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    }).then(() => {
      setJobs(jobs.filter((job) => job.id !== id));
      setIdOptions(idOptions.filter((option) => option.value !== id));
      setNameOptions(
        nameOptions.filter(
          (option) => option.label !== jobs.find((job) => job.id === id)?.name
        )
      );
    });
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (!selectedId || job.id === selectedId.value) &&
      (!selectedName || job.name === selectedName.value)
    );
  });

  return (
    <Box p={4}>
      <HStack align="start" spacing={8}>
        <Divider orientation="vertical" />
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
                    options={idOptions}
                    value={selectedId}
                    onChange={setSelectedId}
                    placeholder="Select ID"
                  />
                </Box>
                <Box w="full">
                  <Text>Name:</Text>
                  <ReactSelect
                    options={nameOptions}
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
          {filteredJobs.map((job, index) => (
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
