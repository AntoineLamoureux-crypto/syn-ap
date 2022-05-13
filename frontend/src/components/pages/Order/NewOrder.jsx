import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Box,
  Select,
} from '@chakra-ui/react';

function NewOrder({ chooseOption }) {
  const toast = useToast();
  const currentUserJSONFormat = localStorage.getItem('currentEmployee');
  const currentEmployee = JSON.parse(currentUserJSONFormat);
  const [newOrder, setNewOrder] = useState({
    clientName: '',
    deliveryNo: '',
    deliveryAddress: '',
    deliveryTime: '',
    deliveryDate: Date,
    createdBy: currentEmployee,
    delivererId: '',
  });

  const [assignees, setAssignees] = useState([
    {
      firstName: '',
      lastName: '',
    },
  ]);

  useEffect(() => {
    fetch(`http://localhost:9090/getAllDeliverers`)
      .then((response) => response.json())
      .then((data) => setAssignees(data));
  }, []);

  const [error, setError] = useState('');

  function handleChangeOrder(event) {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);

    setNewOrder((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:9090/addNewOrder', newOrder);
      toast({
        title: 'Succesfully created a new Order',
        description: 'New order',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setNewOrder({
        clientName: '',
        deliveryNo: '',
        deliveryAddress: '',
        deliveryTime: '',
        deliveryDate: '',
        createdBy: currentEmployee,
        delivererId: '',
      });
      chooseOption('All Orders');
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);
        setError('Error');
      }
    }
  };

  return (
    <>
      <Stack spacing="6" pb={'10'}>
        <Box display={'flex'} my={'4'} mx={'auto'}>
          <Text
            alignContent={'center'}
            fontSize={'xx-large'}
            fontWeight={'bold'}
          >
            Add new Order
          </Text>
        </Box>
        <FormControl id="clientName">
          <FormLabel>Client Name</FormLabel>
          <Input
            name="clientName"
            type="text"
            required
            value={newOrder.clientName}
            onChange={handleChangeOrder}
          />
        </FormControl>
        <FormControl id="deliveryNo">
          <FormLabel>Delivery Number</FormLabel>
          <Input
            name="deliveryNo"
            type="number"
            required
            value={newOrder.deliveryNo}
            onChange={handleChangeOrder}
          />
        </FormControl>
        <FormControl id="deliveryAddress">
          <FormLabel>Delivery Address</FormLabel>
          <Input
            name="deliveryAddress"
            type="text"
            required
            value={newOrder.deliveryAddress}
            onChange={handleChangeOrder}
          />
        </FormControl>
        <FormControl id="deliveryDate">
          <FormLabel>Delivery Date</FormLabel>
          <Input
            name="deliveryDate"
            type="date"
            required
            value={newOrder.deliveryDate}
            onChange={handleChangeOrder}
          />
        </FormControl>
        <FormControl id="deliveryTime">
          <FormLabel>Delivery Time</FormLabel>
          <Select
            placeholder="Select Time Bracket"
            required
            defaultValue={newOrder.deliveryTime}
            name={'deliveryTime'}
            onChange={handleChangeOrder}
          >
            <option value="9:00 - 12:00">9:00 - 12:00</option>
            <option value="14:00 - 17:00">14:00 - 17:00</option>
            <option value="19:00 - 22:00">19:00 - 22:00</option>
          </Select>
        </FormControl>
        <FormControl id="delivererId">
          <FormLabel>Deliverer</FormLabel>
          <Select
            placeholder="Select deliverer"
            required
            defaultValue={newOrder.delivererId}
            name={'delivererId'}
            onChange={handleChangeOrder}
          >
            {assignees.map((item) => (
              <option key={item} value={item.id}>
                {item.firstName} {item.lastName}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button
          onClick={handleSubmit}
          colorScheme="blue"
          size="lg"
          fontSize="md"
        >
          Create
        </Button>
        {error ? <div style={{ color: 'red' }}>{error}</div> : <></>}
      </Stack>
    </>
  );
}

export default NewOrder;
