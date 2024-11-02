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

const JobCard = ({ id, name, castings, edits, diamonds, onDelete, role }) => {
  const [expanded, setExpanded] = useState(false);
  const { isOpen: isCastingOpen, onOpen: onCastingOpen, onClose: onCastingClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDiamondOpen, onOpen: onDiamondOpen, onClose: onDiamondClose } = useDisclosure();

  const [castingData, setCastingData] = useState(castings);
  const [editData, setEditData] = useState(edits);
  const [diamondData, setDiamondData] = useState(diamonds);

  // Calculate total cost logic...

  return (
    <Box
      border="1px solid #d1d5db"
      borderRadius="md"
      p={4}
      bg="#f0f4f8" // Light Grayish Blue background
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
          <Text fontWeight="bold" fontSize="lg">Name:</Text>
          <Text fontSize="xl" fontWeight="bold">{name}</Text>
          {role === Role.VWD && (
            <Text fontWeight="bold" fontSize="lg">Total Cost: ${totalCost.toFixed(2)}</Text>
          )}
        </Stack>
      </Center>
      <HStack spacing={4} justify="center">
        <Button backgroundColor="#e57373" color="white" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Collapse" : "Full Card"}
        </Button>
        <Button backgroundColor="#66bb6a" color="white" onClick={onCastingOpen}>
          Add Casting
        </Button>
        <Button backgroundColor="#42a5f5" color="white" onClick={onEditOpen}>
          Add Edit
        </Button>
        <Button backgroundColor="#ffb74d" color="black" onClick={onDiamondOpen}>
          Add/Return Diamond
        </Button>
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
                <Tr key={data.id}>
                  <Td>{data.date}</Td>
                  <Td>{data.caster}</Td>
                  <Td>{data.goldSilver}</Td>
                  <Td>{data.castingWeight}</Td>
                  <Td>{data.pureWeight}</Td>
                  <Td>
                    <Button backgroundColor="#f44336" color="white" size="sm" onClick={() => handleDeleteRow(data.id, setCastingData, "casting")}>
                      Delete
                    </Button>
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
                    <Button backgroundColor="#f44336" color="white" size="sm" onClick={() => handleDeleteRow(data.id, setEditData, "edit")}>
                      Delete
                    </Button>
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
                    <Button backgroundColor="#f44336" color="white" size="sm" onClick={() => handleDeleteRow(data.id, setDiamondData, "diamond")}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
      {/* Add Casting, Edit, and Diamond Modal Code */}
    </Box>
  );
};

export default JobCard;
