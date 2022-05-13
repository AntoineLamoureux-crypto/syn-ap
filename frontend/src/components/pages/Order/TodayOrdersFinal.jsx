import {
  Avatar,
  Badge,
  Center,
  chakra,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  Box,
  useDisclosure,
  Button,
  Select,
  Container,
  Divider,
} from '@chakra-ui/react';
import axios from 'axios';
import FocusLock from 'react-focus-lock';

import { Icon } from '@chakra-ui/react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
} from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Reorder, motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { GrMap } from 'react-icons/gr';
import { FiEdit } from 'react-icons/fi';
import { useToast } from '@chakra-ui/react';
import {
  HiShieldCheck,
  HiLocationMarker,
  HiShieldExclamation,
} from 'react-icons/hi';
import { AiOutlineFieldNumber, AiOutlineUser } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { MdDateRange } from 'react-icons/md';

const List = chakra(Reorder.Group);
const ListItem = chakra(Reorder.Item);

export default function TodayOrdersFinal() {
  const [isOpen, setIsOpen] = useState({ bool: false, id: null });
  const [filterOption, setFilterOption] = useState('DELIVERING');
  const firstFieldRef = React.useRef(null);
  const toast = useToast();
  const [newOrderStatus, setNewOrderStatus] = useState('');
  const currentUserJSONFormat = localStorage.getItem('currentDeliverer');
  const currentUser = JSON.parse(currentUserJSONFormat);
  const currentUserId = currentUser.id;
  const [currentData, setCurrentData] = useState([
    {
      clientName: '',
      deliveryNo: '',
      deliveryAddress: '',
      deliveryDate: '',
      orderStatus: '',
      deliveryTime: '',
    },
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(`http://localhost:9090/getMyOrders/${currentUserId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setCurrentData(data));
  }

  function handleChangeOrder(event) {
    const { name, value } = event.target;
    setNewOrderStatus((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  async function markDeliveringOrder(id, toast) {
    await axios.post(
      `http://localhost:9090/modifyOrder/status/delivering/${id}`
    );
    toast({
      title: 'Commande en cours de livraison',
      description: 'Le status de la commande a été changé',
      status: 'info',
      duration: 2000,
      isClosable: false,
    });
    fetchData();
  }

  async function markDeliveredOrder(id, toast) {
    await axios.post(
      `http://localhost:9090/modifyOrder/status/delivered/${id}`
    );
    toast({
      title: 'Commande completée',
      description: 'Le status de la commande a été changé',
      status: 'success',
      duration: 2000,
      isClosable: false,
    });
    fetchData();
  }

  function onOpen(id) {
    setIsOpen({ bool: true, id: id });
  }

  function onClose() {
    setIsOpen({ bool: false, id: null });
  }

  function changeOrderStatus(status, id) {
    setIsOpen({ bool: false, id: null });
    if (status.deliveryStatus === 'DELIVERING') {
      markDeliveringOrder(id, toast);
    } else if (status.deliveryStatus === 'DELIVERED') {
      markDeliveredOrder(id, toast);
    }
  }

  function ModalComponent({ value }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <>
        <ArrowForwardIcon boxSize={'17px'} onClick={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Stack
                spacing={{ base: '1', md: '2' }}
                direction={{ base: 'column', md: 'row' }}
              >
                <Box display={'flex'}>
                  <AiOutlineFieldNumber />
                  <Text as="h2" fontWeight="bold" fontSize="xl">
                    {value.deliveryNo}
                  </Text>
                </Box>
                <HStack>
                  <Box
                    fontSize={'sm'}
                    as="span"
                    bgColor={
                      value.orderStatus === 'DELIVERED'
                        ? 'green.400'
                        : value.orderStatus === 'READY'
                        ? 'blue.400'
                        : 'red.400'
                    }
                    color={'white'}
                    borderRadius={'sm'}
                    p={1}
                    lineHeight="1"
                  >
                    {value.orderStatus}
                  </Box>
                  <Icon
                    my={'auto'}
                    as={
                      value.orderStatus === 'DELIVERED'
                        ? HiShieldCheck
                        : value.orderStatus === 'READY'
                        ? HiShieldCheck
                        : HiShieldExclamation
                    }
                    boxSize={'25px'}
                    color={
                      value.orderStatus === 'DELIVERED'
                        ? 'green.400'
                        : value.orderStatus === 'READY'
                        ? 'blue.400'
                        : 'red.400'
                    }
                  />
                </HStack>
              </Stack>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box pb={10} pt={1} w={'full'}>
                <Box
                  mx={'auto'}
                  rounded={{ md: 'xl' }}
                  padding="10"
                  shadow={{ md: 'base' }}
                >
                  <HStack py={1}>
                    <Icon as={AiOutlineUser} fontSize="xl" color="gray.400" />
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color={useColorModeValue('gray.600', 'gray.300')}
                    >
                      <b>{value.clientName}</b>
                    </Text>
                  </HStack>
                  <HStack py={1}>
                    <Icon
                      as={HiLocationMarker}
                      fontSize="xl"
                      color="gray.400"
                    />
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color={useColorModeValue('gray.600', 'gray.300')}
                    >
                      <b>{value.deliveryAddress}</b>
                    </Text>
                  </HStack>
                  <HStack py={1}>
                    <Icon as={MdDateRange} fontSize="xl" color="gray.400" />
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color={useColorModeValue('gray.600', 'gray.300')}
                    >
                      <b>
                        {JSON.stringify(value.deliveryDate).substring(1, 11)}
                      </b>
                    </Text>
                  </HStack>
                  <HStack py={1}>
                    <Icon as={BiTimeFive} fontSize="xl" color="gray.400" />
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      color={useColorModeValue('gray.600', 'gray.300')}
                    >
                      {value.deliveryTime}
                    </Text>
                  </HStack>
                </Box>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Box bg="bg-surface">
        <Container py={{ base: '4', md: '8' }}>
          <HStack>
            <Divider />
            <Box as="label" cursor="pointer">
              <Button
                _focus={{ boxShadow: 'none' }}
                w={'90px'}
                size={'sm'}
                bgColor={
                  filterOption === 'DELIVERING' ? 'turquoise' : 'gray.100'
                }
                color={filterOption === 'DELIVERING' ? 'white' : 'black'}
                onClick={() => setFilterOption('DELIVERING')}
              >
                EN COURS
              </Button>
            </Box>
            <Box as="label" cursor="pointer">
              <Button
                _focus={{ boxShadow: 'none' }}
                w={'90px'}
                size={'sm'}
                bgColor={filterOption === 'READY' ? 'turquoise' : 'gray.100'}
                color={filterOption === 'READY' ? 'white' : 'black'}
                onClick={() => setFilterOption('READY')}
              >
                PRÊT
              </Button>
            </Box>
            <Box as="label" cursor="pointer">
              <Button
                _focus={{ boxShadow: 'none' }}
                w={'90px'}
                size={'sm'}
                bgColor={
                  filterOption === 'DELIVERED' ? 'turquoise' : 'gray.100'
                }
                color={filterOption === 'DELIVERED' ? 'white' : 'black'}
                onClick={() => setFilterOption('DELIVERED')}
              >
                LIVRÉES
              </Button>
            </Box>
            <Divider />
          </HStack>
        </Container>
      </Box>
      <Center maxW="xl" mx={'auto'} py={{ base: '4', md: '8' }}>
        <Stack spacing="5" flex="1">
          <List values={currentData} onReorder={setCurrentData}>
            <Stack spacing="3" width="full">
              {console.log(filterOption)}
              {currentData
                .filter((value) => value.orderStatus === filterOption)
                .map((value) =>
                  value ? (
                    <ListItem
                      key={value.id}
                      value={value}
                      boxShadow={'md'}
                      position="relative"
                      borderRadius="lg"
                      cursor="pointer"
                      whileDrag={{ cursor: 'grabbing', scale: 1.1 }}
                    >
                      <Stack shouldWrapChildren spacing="4">
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          initial={{ opacity: 0, y: 20 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Box display={'flex'} justifyContent={'flex-end'}>
                            <Text
                              fontSize="sm"
                              fontWeight="medium"
                              color="emphasized"
                              mr={'auto'}
                            >
                              {value.clientName}
                            </Text>
                            <motion.div
                              animate={{ opacity: 1, y: 0 }}
                              initial={{ opacity: 0, y: 20 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.15 }}
                              whileHover={{ scale: 1.2 }}
                            >
                              <ModalComponent value={value} />
                            </motion.div>
                          </Box>
                        </motion.div>
                        <HStack justify="space-between">
                          <Popover
                            isOpen={isOpen.id === value.id}
                            initialFocusRef={firstFieldRef}
                            onOpen={() => onOpen(value.id)}
                            onClose={onClose}
                            closeOnBlur={false}
                          >
                            <motion.div
                              animate={{ opacity: 1, y: 0 }}
                              initial={{ opacity: 0, y: 20 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.15 }}
                            >
                              <Box
                                display={'inline-flex'}
                                justifyContent={'flex-end'}
                                w={'100px'}
                              >
                                <Box pr={2}>
                                  <Badge
                                    colorScheme={
                                      value.orderStatus === 'DELIVERED'
                                        ? 'green'
                                        : value.orderStatus === 'READY'
                                        ? 'blue'
                                        : 'red'
                                    }
                                    size="sm"
                                  >
                                    {value.orderStatus}
                                  </Badge>
                                </Box>
                                <Box my={'auto'} ml={'auto'}>
                                  <PopoverTrigger>
                                    <FiEdit onClick={() => onOpen(value.id)} />
                                  </PopoverTrigger>
                                </Box>
                              </Box>
                            </motion.div>
                            <PopoverContent ml={20} mt={5}>
                              <FocusLock returnFocus persistentFocus={false}>
                                <PopoverArrow />
                                <Box
                                  firstFieldRef={firstFieldRef}
                                  onCancel={onClose}
                                  display={'flex'}
                                  justifyContent={'flex-end'}
                                  m={1}
                                >
                                  <Select
                                    name={'deliveryStatus'}
                                    defaultValue={value.orderStatus}
                                    mr={2}
                                    onChange={handleChangeOrder}
                                  >
                                    <option value="DELIVERING">
                                      DELIVERING
                                    </option>
                                    <option value="DELIVERED">DELIVERED</option>
                                    <option value="READY">READY</option>
                                  </Select>
                                  <Button
                                    colorScheme="teal"
                                    onClick={() =>
                                      changeOrderStatus(
                                        newOrderStatus,
                                        value.id
                                      )
                                    }
                                  >
                                    Save
                                  </Button>
                                </Box>
                              </FocusLock>
                            </PopoverContent>
                          </Popover>
                          <motion.div
                            animate={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 20 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.15 }}
                          >
                            <HStack spacing="3">
                              <Text
                                fontSize="xs"
                                color="subtle"
                                fontWeight="medium"
                              >
                                {value.deliveryAddress}
                              </Text>
                              <GrMap />
                            </HStack>
                          </motion.div>
                        </HStack>
                      </Stack>
                    </ListItem>
                  ) : null
                )}
            </Stack>
          </List>
        </Stack>
      </Center>
    </>
  );
}
