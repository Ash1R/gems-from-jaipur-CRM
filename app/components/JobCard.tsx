import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { DeleteIcon } from "@chakra-ui/icons";
import ReactSelect, { Option } from "./ReactSelect";
import Role from "./RoleConstants";
import axios from "axios";

interface JobCardProps {
  id: string;
  name: string;
  castings: any[];
  edits: any[];
  diamonds: any[];
  onDelete: () => void;
  role: string;
}

interface CastingData {
  date: string;
  caster: string;
  goldSilver: string;
  castingWeight: string;
  pureWeight: string;
  goldRate: string;
}

interface EditData {
  stepType: string;
  weightBefore: string;
  weightAfter: string;
  polishGuy: string;
  cost: string;
}

interface DiamondData {
  setterName: string;
  beforeWeight: string;
  afterWeight: string;
  diamondWeight: string;
  diamondQuality: string;
  settingDustWeight: string;
  totalLoss: string;
  totalNumberDiamondSet: string;
  totalCt: string;
  returnCt: string;
  brokenDiamondNumber: string;
  brokenDiamondCt: string;
  diamondCost: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  name,
  castings,
  edits,
  diamonds,
  onDelete,
  role,
}) => {
  const tunchOptions = [
    { value: "gold ct. / silver", label: "gold ct. / silver" },
    { value: "silver", label: "silver" },
    { value: "14 k yellow", label: "14 k yellow" },
    { value: "10 k yellow", label: "10 k yellow" },
    { value: "14 k white", label: "14 k white" },
    { value: "18 k yellow", label: "18 k yellow" },
    { value: "14 k rose", label: "14 k rose" },
    { value: "10k yellow white", label: "10k yellow white" },
    { value: "10k white pink", label: "10k white pink" },
    { value: "10k white", label: "10k white" },
    { value: "10k white yellow", label: "10k white yellow" },
    { value: "14k white", label: "14k white" },
    { value: "14k yellow", label: "14k yellow" },
    { value: "14k white pink", label: "14k white pink" },
    { value: "10 k yellow & white", label: "10 k yellow & white" },
    { value: "10 k rose & white", label: "10 k rose & white" },
    { value: "18 k white", label: "18 k white" },
    { value: "9k white", label: "9k white" },
    { value: "9k rose", label: "9k rose" },
    { value: "14 k yellow & white", label: "14 k yellow & white" },
    { value: "14 k white & yellow", label: "14 k white & yellow" },
    { value: "22k yellow", label: "22k yellow" },
    { value: "10k yellow", label: "10k yellow" },
    { value: "10k pink", label: "10k pink" },
    { value: "10k yellow rose", label: "10k yellow rose" },
    { value: "9 k yellow", label: "9 k yellow" },
    { value: "10 k yellow mix", label: "10 k yellow mix" },
    { value: "14 k yellow white", label: "14 k yellow white" },
    { value: "14k yellow rose", label: "14k yellow rose" },
    { value: "10k rose", label: "10k rose" },
    { value: "14k pink white", label: "14k pink white" },
    { value: "18 k rose", label: "18 k rose" },
    { value: "10 k white & yellow", label: "10 k white & yellow" },
    { value: "10 k white & rose", label: "10 k white & rose" },
    { value: "14 yellow", label: "14 yellow" },
    { value: "18k yellow & white", label: "18k yellow & white" },
    {
      value: "10 k yellow & white & rose",
      label: "10 k yellow & white & rose",
    },
    { value: "10 k rose & yellow", label: "10 k rose & yellow" },
    { value: "10 k pink white", label: "10 k pink white" },
    { value: "10 k yellow & rose", label: "10 k yellow & rose" },
    { value: "10 k rose", label: "10 k rose" },
    { value: "14 k pink white", label: "14 k pink white" },
    { value: "18k pink", label: "18k pink" },
    { value: "14 k yellow & white", label: "14 k yellow & white" },
    { value: "14 k white", label: "14 k white" },
    { value: "10 k yellow", label: "10 k yellow" },
    { value: "14 k rose", label: "14 k rose" },
    { value: "18k rose", label: "18k rose" },
    { value: "18 k white yellow", label: "18 k white yellow" },
    { value: "18 k white", label: "18 k white" },
    { value: "10 k rose", label: "10 k rose" },
    { value: "14 k rose", label: "14 k rose" },
    { value: "18k yellow", label: "18k yellow" },
  ];

  const stepOptions = [
    { value: "Soldering", label: "Soldering" },
    { value: "Use Wire", label: "Use Wire" },
    { value: "Runner", label: "Runner" },
    { value: "Polish", label: "Polish" },
    { value: "Lazer", label: "Lazer" },
    { value: "Hammer", label: "Hammer" },
  ];
  const [expanded, setExpanded] = useState(false);
  const {
    isOpen: isCastingOpen,
    onOpen: onCastingOpen,
    onClose: onCastingClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDiamondOpen,
    onOpen: onDiamondOpen,
    onClose: onDiamondClose,
  } = useDisclosure();
  const [castingData, setCastingData] = useState(castings);
  const [editData, setEditData] = useState(edits);
  const [diamondData, setDiamondData] = useState(diamonds);

  const { control, handleSubmit, reset } = useForm<CastingData>({
    defaultValues: {
      date: new Date().toISOString().substring(0, 10),
      caster: "",
      goldSilver: "",
      castingWeight: "",
      pureWeight: "",
      goldRate: "", // Add this line for gold rate
    },
  });

  const {
    control: editControl,
    handleSubmit: handleEditSubmit,
    reset: editReset,
  } = useForm<EditData>({
    defaultValues: {
      stepType: "",
      weightBefore: "",
      weightAfter: "",
      polishGuy: "",
      cost: "", // Add this line for cost
    },
  });

  const {
    control: diamondControl,
    handleSubmit: handleDiamondSubmit,
    reset: diamondReset,
  } = useForm<DiamondData>({
    defaultValues: {
      setterName: "",
      beforeWeight: "",
      afterWeight: "",
      diamondWeight: "",
      diamondQuality: "",
      settingDustWeight: "",
      totalLoss: "",
      totalNumberDiamondSet: "",
      totalCt: "",
      returnCt: "",
      brokenDiamondNumber: "",
      brokenDiamondCt: "",
      diamondCost: "", // Add this line for diamond cost
    },
  });

  const handleAddCasting = (data: CastingData) => {
    const newCasting = {
      date: data.date,
      caster: data.caster,
      goldSilver: data.goldSilver,
      castingWeight: data.castingWeight,
      pureWeight: data.pureWeight,
      goldRate: data.goldRate, // Include gold rate in the data
    };

    axios
      .post(`/api/jobs/${id}/castings`, newCasting)
      .then((response) => {
        setCastingData([...castingData, response.data]);
      })
      .catch((error) => {
        console.error("Error adding casting:", error); // Log the error
      });

    reset();
    onCastingClose();
  };

  const handleAddEdit = (data: EditData) => {
    const newEdit = {
      stepType: data.stepType,
      weightBefore: data.weightBefore,
      weightAfter: data.weightAfter,
      polishGuy: data.polishGuy,
      cost: data.cost, // Include cost in the data
    };

    axios
      .post(`/api/jobs/${id}/edits`, newEdit)
      .then((response) => {
        setEditData([...editData, response.data]);
      })
      .catch((error) => {
        console.error("Error adding edit:", error); // Log the error
      });

    editReset();
    onEditClose();
  };

  const handleDeleteRow = (
    index: number, //NOTE here index is actually id of each type as in Database
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    dataType: "casting" | "edit" | "diamond"
  ) => {
    let newData;
    if (dataType === "casting") {
      newData = castingData.filter((d, i) => d.id !== index);
      axios.delete(`/api/jobs/${id}/castings?id=${index}`).then((response) => {
        setCastingData(newData);
      });
    } else if (dataType === "edit") {
      newData = editData.filter((d, i) => d.id !== index);
      axios.delete(`/api/jobs/${id}/edits?id=${index}`).then((response) => {
        setEditData(newData);
      });
    } else if (dataType === "diamond") {
      newData = diamondData.filter((d, i) => d.id !== index);
      axios.delete(`/api/jobs/${id}/diamonds?id=${index}`).then((response) => {
        setDiamondData(newData);
      });
    }
  };

  const handleAddDiamond = (data: DiamondData) => {
    const newDiamond = {
      setterName: data.setterName,
      beforeWeight: data.beforeWeight,
      afterWeight: data.afterWeight,
      diamondWeight: data.diamondWeight,
      diamondQuality: data.diamondQuality,
      settingDustWeight: data.settingDustWeight,
      totalLoss: data.totalLoss,
      totalNumberDiamondSet: data.totalNumberDiamondSet,
      totalCt: data.totalCt,
      returnCt: data.returnCt,
      brokenDiamondNumber: data.brokenDiamondNumber,
      brokenDiamondCt: data.brokenDiamondCt,
      diamondCost: data.diamondCost, // Include diamond cost in the data
    };

    axios
      .post(`/api/jobs/${id}/diamonds`, newDiamond)
      .then((response) => {
        setDiamondData([...diamondData, response.data]);
      })
      .catch((error) => {
        console.error("Error adding diamond:", error); // Log the error
      });

    diamondReset();
    onDiamondClose();
  };

  // Calculate the total cost
  const totalCost =
    castingData.reduce(
      (acc, casting) =>
        acc +
        (parseFloat(casting.pureWeight || "0") +
          parseFloat(casting.goldRate || "0")),
      0
    ) +
    editData.reduce((acc, edit) => acc + parseFloat(edit.cost || "0"), 0) +
    diamondData.reduce(
      (acc, diamond) => acc + parseFloat(diamond.diamondCost || "0"),
      0
    );

  return (
    <Box
      border="1px solid black"
      borderRadius="md"
      p={4}
      bg="purple.100"
      w="full"
      position="relative"
    >
      {role === Role.VWD &&
        castingData?.length === 0 &&
        editData?.length === 0 &&
        diamondData?.length === 0 && (
          <IconButton
            icon={<DeleteIcon />}
            aria-label="Delete"
            position="absolute"
            top="4px"
            right="4px"
            colorScheme="red"
            onClick={onDelete}
          />
        )}
      <Center flexDirection="column" textAlign="center" mb={4}>
        <Stack direction="row" spacing={4} align="center">
          <Text fontWeight="bold" fontSize="lg">
            Name:
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            {name}
          </Text>
          {role === Role.VWD && (
            <Text fontWeight="bold" fontSize="lg">
              Total Cost: ${totalCost.toFixed(2)}
            </Text>
          )}
        </Stack>
      </Center>
      <HStack spacing={4} justify="center">
        <Button colorScheme="pink" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Full Card"}
        </Button>
        <Button colorScheme="blue" onClick={onCastingOpen}>
          Add Casting
        </Button>
        <Button colorScheme="green" onClick={onEditOpen}>
          Add Edit
        </Button>
        <Button colorScheme="yellow" onClick={onDiamondOpen}>
          Add/Return Diamond
        </Button>
      </HStack>
      {expanded && (
        <>
          <Text fontWeight="bold" mt={4}>
            Casting Table
          </Text>
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
                <Tr key={data.id}>
                  <Td>{data.date}</Td>
                  <Td>{data.caster}</Td>
                  <Td>{data.goldSilver}</Td>
                  <Td>{data.castingWeight}</Td>
                  <Td>{data.pureWeight}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() =>
                        handleDeleteRow(data.id, setCastingData, "casting")
                      }
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Text fontWeight="bold" mt={4}>
            Edits Table
          </Text>
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
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() =>
                        handleDeleteRow(data.id, setEditData, "edit")
                      }
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <Text fontWeight="bold" mt={4}>
            Diamond Table
          </Text>
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
                  <Td>{data.diamondCost}</Td>
                  <Td>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() =>
                        handleDeleteRow(data.id, setDiamondData, "diamond")
                      }
                    >
                      Delete
                    </Button>
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
                    <Input placeholder="Date" type="date" {...field} />
                  )}
                />

                <Controller
                  name="caster"
                  control={control}
                  render={({ field }) => (
                    <Input placeholder="Caster" {...field} />
                  )}
                />
                <Controller
                  name="goldSilver"
                  control={control}
                  render={({ field }) => (
                    <ReactSelect
                      options={tunchOptions}
                      value={
                        tunchOptions.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                      onChange={(value) => field.onChange(value?.value || "")}
                      placeholder="Gold Ct./Silver"
                    />
                  )}
                />
                <Controller
                  name="castingWeight"
                  control={control}
                  render={({ field }) => (
                    <Input placeholder="Casting Weight" {...field} />
                  )}
                />
                <Controller
                  name="pureWeight"
                  control={control}
                  render={({ field }) => (
                    <Input placeholder="Pure Weight" {...field} />
                  )}
                />

                {role === Role.VWD && (
                  <Controller
                    name="goldRate"
                    control={control}
                    render={({ field }) => (
                      <Input placeholder="Gold Rate" {...field} />
                    )}
                  />
                )}
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
                      options={[
                        { value: "Soldering", label: "Soldering" },
                        { value: "Use Wire", label: "Use Wire" },
                        { value: "Runner", label: "Runner" },
                        { value: "Polish", label: "Polish" },
                        { value: "Lazer", label: "Lazer" },
                        { value: "Hammer", label: "Hammer" },
                      ]}
                      value={
                        stepOptions.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                      onChange={(value) => field.onChange(value?.value || "")}
                      placeholder="Type of Step"
                    />
                  )}
                />
                <Controller
                  name="weightBefore"
                  control={editControl}
                  render={({ field }) => (
                    <Input placeholder="Weight Before" {...field} />
                  )}
                />
                <Controller
                  name="weightAfter"
                  control={editControl}
                  render={({ field }) => (
                    <Input placeholder="Weight After" {...field} />
                  )}
                />

                {role === Role.VWD && (
                  <Controller
                    name="cost"
                    control={editControl}
                    render={({ field }) => (
                      <Input placeholder="Cost (if applicable)" {...field} />
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
                    <Input placeholder="Setter Name" {...field} />
                  )}
                />
                <Controller
                  name="beforeWeight"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input placeholder="Before Weight" {...field} />
                  )}
                />
                <Controller
                  name="afterWeight"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input placeholder="After Weight" {...field} />
                  )}
                />
                <Controller
                  name="diamondWeight"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input placeholder="Diamond Weight" {...field} />
                  )}
                />
                <Controller
                  name="diamondQuality"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input placeholder="Diamond Quality" {...field} />
                  )}
                />
                <Controller
                  name="settingDustWeight"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input placeholder="Setting Dust Weight" {...field} />
                  )}
                />
                <Controller
                  name="totalLoss"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input placeholder="Total Loss" {...field} />
                  )}
                />
                <Controller
                  name="totalNumberDiamondSet"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input placeholder="Total Number Diamond Set" {...field} />
                  )}
                />
                <Controller
                  name="totalCt"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input placeholder="Total Ct" {...field} />
                  )}
                />
                <Controller
                  name="returnCt"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input placeholder="Return Ct" {...field} />
                  )}
                />
                <Controller
                  name="brokenDiamondNumber"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input placeholder="Broken Diamond Number" {...field} />
                  )}
                />
                <Controller
                  name="brokenDiamondCt"
                  control={diamondControl}
                  render={({ field }) => (
                    <Input placeholder="Broken Diamond Ct" {...field} />
                  )}
                />

                {role === Role.VWD && (
                  <Controller
                    name="diamondCost"
                    control={diamondControl}
                    render={({ field }) => (
                      <Input placeholder="Diamond Cost" {...field} />
                    )}
                  />
                )}
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
