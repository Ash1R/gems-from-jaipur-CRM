// components/JobCard.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Center,
  Stack,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { DeleteIcon } from '@chakra-ui/icons';
import ReactSelect from './ReactSelect';

interface JobCardProps {
  id: string;
  name: string;
  onDelete: () => void;
}

const initialOptions = [
  { value: 'Option1', label: 'Option1' },
  { value: 'Option2', label: 'Option2' },
];

const editOptions = [
  { value: 'Polish', label: 'Polish' },
  { value: 'Step2', label: 'Step2' },
  { value: 'Step3', label: 'Step3' },
];

const diamondQualityOptions = [
  { value: 'Quality1', label: 'Quality1' },
  { value: 'Quality2', label: 'Quality2' },
];

const JobCard: React.FC<JobCardProps> = ({ id, name, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const { isOpen: isCastingOpen, onOpen: onCastingOpen, onClose: onCastingClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDiamondOpen, onOpen: onDiamondOpen, onClose: onDiamondClose } = useDisclosure();
  const [castingData, setCastingData] = useState<any[]>([]);
  const [editData, setEditData] = useState<any[]>([]);
  const [diamondData, setDiamondData] = useState<any[]>([]);
  const [orderedDiamondsData, setOrderedDiamondsData] = useState<any[]>([]);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      date: new Date().toISOString().substring(0, 10),
      caster: '',
      goldSilver: '',
      castingWeight: '',
      pureWeight: '',
    },
  });

  const {
    control: editControl,
    handleSubmit: handleEditSubmit,
    watch,
    reset: editReset,
  } = useForm({
    defaultValues: {
      stepType: '',
      weightBefore: '',
      weightAfter: '',
      polishGuy: '',
    },
  });

  const {
    control: diamondControl,
    handleSubmit: handleDiamondSubmit,
    reset: diamondReset,
  } = useForm({
    defaultValues: {
      setterName: '',
      beforeWeight: '',
      afterWeight: '',
      diamondWeight: '',
      diamondQuality: '',
      settingDustWeight: '',
      totalLoss: '',
      totalNumberDiamondSet: '',
      totalCt: '',
      returnCt: '',
      brokenDiamondNumber: '',
      brokenDiamondCt: '',
    },
  });

  const stepType = watch('stepType');

  const handleAddCasting = (data) => {
    setCastingData((prevCastingData) => [
      ...prevCastingData,
      {
        date: data.date,
        caster: data.caster.label,
        goldSilver: data.goldSilver.label,
        castingWeight: data.castingWeight,
        pureWeight: data.pureWeight,
      },
    ]);

    reset();
    onCastingClose();
  };

  const handleAddEdit = (data) => {
    setEditData((prevEditData) => [
      ...prevEditData,
      {
        stepType: data.stepType.label,
        weightBefore: data.weightBefore,
        weightAfter: data.weightAfter,
        polishGuy: data.polishGuy,
      },
    ]);

    editReset();
    onEditClose();
  };

  const handleAddDiamond = (data) => {
    setDiamondData((prevDiamondData) => [
      ...prevDiamondData,
      {
        setterName: data.setterName,
        beforeWeight: data.beforeWeight,
        afterWeight: data.afterWeight,
        diamondWeight: data.diamondWeight,
        diamondQuality: data.diamondQuality.label,
        settingDustWeight: data.settingDustWeight,
        totalLoss: data.totalLoss,
        totalNumberDiamondSet: data.totalNumberDiamondSet,
        totalCt: data.totalCt,
        returnCt: data.returnCt,
        brokenDiamondNumber: data.brokenDiamondNumber,
        brokenDiamondCt: data.brokenDiamondCt,
      },
    ]);

    diamondReset();
    onDiamondClose();
  };

  const handleDeleteRow = (index, setData) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <Box border="1px solid black" borderRadius="md" p={4} bg="purple.100" w="full" position="relative">
      <IconButton
        icon={<DeleteIcon />}
        aria-label="Delete"
        position="absolute"
        top="4px"
        right="4px"
        colorScheme="red"
        onClick={onDelete}
      />
      <Center flexDirection="column" textAlign="center" mb={4}>
        <Stack direction="column" spacing={2} align="center">
          <Text fontWeight="bold" fontSize="lg">ID:</Text>
          <Text fontSize="xl" fontWeight="bold">
            {id}
          </Text>
          <Text fontWeight="bold" fontSize="lg">Name:</Text>
          <Text fontSize="xl" fontWeight="bold">
            {name}
          </Text>
        </Stack>
      </Center>
      <HStack spacing={4} justify="center">
        <Button colorScheme="pink" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Collapse' : 'Full Card'}
        </Button>
        <Button colorScheme="blue" onClick={onCastingOpen}>Add Casting</Button>
        <Button colorScheme="green" onClick={onEditOpen}>Add Edit</Button>
        <Button colorScheme="yellow" onClick={onDiamondOpen}>Add/Return Diamond</Button>
      </HStack>
      {expanded && (
        <>
          <Text fontWeight="bold" mt={4}>Casting Table</Text>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Caster</Th>
                <Th>Gold Ct./Silver</Th>
                <Th>Casting Weight</Th>
                <Th>Pure Weight</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {castingData.map((data, index) => (
                <Tr key={index}>
                  <Td>{data.date}</Td>
                  <Td>{data.caster}</Td>
                  <Td>{data.goldSilver}</Td>
                  <Td>{data.castingWeight}</Td>
                  <Td>{data.pureWeight}</Td>
                  <Td>
                    <Button colorScheme="red" size="sm" onClick={() => handleDeleteRow(index, setCastingData)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Text fontWeight="bold" mt={4}>Edits Table</Text>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Type of Step</Th>
                <Th>Weight Before</Th>
                <Th>Weight After</Th>
                <Th>Polish Guy</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {editData.map((data, index) => (
                <Tr key={index}>
                  <Td>{data.stepType}</Td>
                  <Td>{data.weightBefore}</Td>
                  <Td>{data.weightAfter}</Td>
                  <Td>{data.polishGuy}</Td>
                  <Td>
                    <Button colorScheme="red" size="sm" onClick={() => handleDeleteRow(index, setEditData)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Text fontWeight="bold" mt={4}>Diamond Table</Text>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Setter Name</Th>
                <Th>Before Weight</Th>
                <Th>After Weight</Th>
                <Th>Diamond Weight</Th>
                <Th>Diamond Quality</Th>
                <Th>Setting Dust Weight</Th>
                <Th>Total Loss</Th>
                <Th>Total Number Diamond Set</Th>
                <Th>Total Ct</Th>
                <Th>Return Ct</Th>
                <Th>Broken Diamond Number</Th>
                <Th>Broken Diamond Ct</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {diamondData.map((data, index) => (
                <Tr key={index}>
                  <Td>{data.setterName}</Td>
                  <Td>{data.beforeWeight}</Td>
                  <Td>{data.afterWeight}</Td>
                  <Td>{data.diamondWeight}</Td>
                  <Td>{data.diamondQuality}</Td>
                  <Td>{data.settingDustWeight}</Td>
                  <Td>{data.totalLoss}</Td>
                  <Td>{data.totalNumberDiamondSet}</Td>
                  <Td>{data.totalCt}</Td>
                  <Td>{data.returnCt}</Td>
                  <Td>{data.brokenDiamondNumber}</Td>
                  <Td>{data.brokenDiamondCt}</Td>
                  <Td>
                    <Button colorScheme="red" size="sm" onClick={() => handleDeleteRow(index, setDiamondData)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Text fontWeight="bold" mt={4}>Ordered Diamonds</Text>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr>
                <Th>Details</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderedDiamondsData.map((data, index) => (
                <Tr key={index}>
                  <Td>{data.details}</Td>
                  <Td>
                    <Button colorScheme="red" size="sm" onClick={() => handleDeleteRow(index, setOrderedDiamondsData)}>Delete</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}

      <Modal isOpen={isCastingOpen} onClose={onCastingClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Casting</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleAddCasting)}>
              <VStack spacing={4} align="start">
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Date"
                      type="date"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="caster"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      options={initialOptions}
                      {...field}
                      placeholder="Select Caster"
                    />
                  )}
                />
                <Controller
                  name="goldSilver"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      options={initialOptions}
                      {...field}
                      placeholder="Gold Ct./Silver"
                    />
                  )}
                />
                <Controller
                  name="castingWeight"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Casting Weight"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="pureWeight"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Pure Weight"
                      {...field}
                    />
                  )}
                />
              </VStack>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button variant="ghost" onClick={onCastingClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleEditSubmit(handleAddEdit)}>
              <VStack spacing={4} align="start">
                <Controller
                  name="stepType"
                  control={editControl}
                  render={({ field }) => (
                    <ReactSelect
                      options={editOptions}
                      {...field}
                      placeholder="Type of Step"
                    />
                  )}
                />
                <Controller
                  name="weightBefore"
                  control={editControl}
                  render={({ field }) => (
                    <Input
                      placeholder="Weight Before"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="weightAfter"
                  control={editControl}
                  render={({ field }) => (
                    <Input
                      placeholder="Weight After"
                      {...field}
                    />
                  )}
                />
                {stepType?.value === 'Polish' && (
                  <Controller
                    name="polishGuy"
                    control={editControl}
                    render={({ field }) => (
                      <Input
                        placeholder="Polish Guy"
                        {...field}
                      />
                    )}
                  />
                )}
              </VStack>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button variant="ghost" onClick={onEditClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isDiamondOpen} onClose={onDiamondClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add/Return Diamond</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleDiamondSubmit(handleAddDiamond)}>
              <VStack spacing={4} align="start">
                <Controller
                  name="setterName"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input
                      placeholder="Setter Name"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="beforeWeight"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input
                      placeholder="Before Weight"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="afterWeight"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input
                      placeholder="After Weight"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="diamondWeight"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input
                      placeholder="Diamond Weight"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="diamondQuality"
                  control={diamondControl}
                  render={({ field }) => (
                    <ReactSelect
                      options={diamondQualityOptions}
                      {...field}
                      placeholder="Diamond Quality"
                    />
                  )}
                />
                <Controller
                  name="settingDustWeight"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input
                      placeholder="Setting Dust Weight"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="totalLoss"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input
                      placeholder="Total Loss"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="totalNumberDiamondSet"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input
                      placeholder="Total Number Diamond Set"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="totalCt"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input
                      placeholder="Total Ct"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="returnCt"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input
                      placeholder="Return Ct"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="brokenDiamondNumber"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input
                      placeholder="Broken Diamond Number"
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="brokenDiamondCt"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input
                      placeholder="Broken Diamond Ct"
                      {...field}
                    />
                  )}
                />
              </VStack>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Save
                </Button>
                <Button variant="ghost" onClick={onDiamondClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default JobCard;
