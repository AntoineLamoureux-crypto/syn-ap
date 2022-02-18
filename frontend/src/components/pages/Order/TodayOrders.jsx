import React from "react";
import { useState, useEffect } from "react";
import { Text, Box, Input, Button, Grid, FormLabel } from '@chakra-ui/react'
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { ViewIcon } from '@chakra-ui/icons'
import "./css/Styles.css";
import axios from 'axios'
import { Radio, RadioGroup, Stack } from '@chakra-ui/react'
import { useRef } from "react";
import { useMotionValue } from "framer-motion";

function markDeliveringOrder(id, toast)  {
  axios.post(`http://localhost:9090/modifyOrder/status/delivering/${id}`);
  toast({
    title: 'Delivery Marked Delivering',
    description: "We've created your account for you.",
    status: 'success',
    duration: 9000,
    isClosable: true,
  })
}

function markDeliveredOrder(id, toast)  {
  axios.post(`http://localhost:9090/modifyOrder/status/delivered/${id}`);
  toast({
    title: 'Delivery Marked Delivered',
    description: "We've created your account for you.",
    status: 'success',
    duration: 9000,
    isClosable: true,
  })
}


function TodayOrders() {
    const [currentData, setCurrentData] = useState([
        {
          clientName: '',
          deliveryNo: '',
          deliveryAddress: '',
          deliveryDate: '',
          orderStatus: '',
          deliveryTime: ''
        }
      ]);
      useEffect(() => {
        const currentUserJSONFormat = localStorage.getItem("currentDeliverer");
        const currentUser = JSON.parse(currentUserJSONFormat);
        const currentUserId = currentUser.id;
        fetch(`http://localhost:9090/getMyOrders/${currentUserId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "GET",
        })
        .then(response => response.json())
        .then(data => setCurrentData(data))
      }, []);
  return (
      <>
    <Box mx={'auto'}>
        <Text fontFamily={'heading'} fontSize={'30px'} fontWeight={'semibold'} my={'3'} >Orders assigned to me</Text>
    </Box>
    <AnimateSharedLayout>
      <motion.ul layout initial={{ borderRadius: 25 }} >
        {currentData.map(item => (
          <> 
            <Item key={item} data={item} setData={setCurrentData} />
          </>
        ))}
      </motion.ul>
    </AnimateSharedLayout>
    </>
  );
}

function Item({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  const constraintsRef = useRef(null);
  const x = useMotionValue(0);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  return (
      <>
    <motion.li layout initial={{ borderRadius: 10 }} style={{ background: 'rgba(214, 214, 214, 0.5)'}} >
    <Box w={'100%'} flexDirection={'row'} display={'flex'}>
        <Box onClick={toggleOpen}>
            <motion.div 
                whileFocus={{ size: 5 }} 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} >
            <ViewIcon boxSize={10} />
            </motion.div>
        </Box>
      <motion.div 
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} 
      >
      <Box mx={'5'}>
        <Text fontFamily={'heading'} fontSize={'xl'} fontWeight={'semibold'} >{data.clientName}</Text>
      </Box>
      </motion.div>
      </Box>
      <motion.div
       layout
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }} 
       
      >
      </motion.div>
      <AnimatePresence>{isOpen &&
         <motion.div
         layout
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
       >
        <Box>
            <Grid templateColumns={'repeat(2, 1fr)'} mt={'2'}>
                <Box mx={'5'}>
                    <FormLabel>Delivery Address</FormLabel>
                    <Input disabled name="deliveryAddress" type="text" placeholder={data.deliveryAddress} variant='filled' bgColor={'gray.900'}/>
                </Box>
                <Box mx={'5'}>
                    <FormLabel>Delivery Date</FormLabel>
                    <Input disabled name="deliveryDate" type="text" placeholder={data.deliveryDate} variant='filled' bgColor={'gray.900'}/>
                </Box>
                {data.orderStatus === 'READY' ? 
                <Box mx={'5'} mt={'5'}>
                    <FormLabel>Mark delivery started</FormLabel>
                    <Button bgColor={'blue.200'} size={'sm'} _hover={{bgColor: 'blue.400'}} onClick={ ()=> markDeliveringOrder(data.id) } >Start</Button>
                </Box>
                : <></>}

                {data.orderStatus === 'DELIVERING' ? 
                <>
                <Box mx={'5'} mt={'5'}>
                    <FormLabel>Mark delivery completed</FormLabel>
                    <Button bgColor={'green.200'} size={'sm'} _hover={{bgColor: 'green.400'}} onClick={ () => markDeliveredOrder(data.id) } >Completed</Button>
                </Box>
                <Box className="switch" data-isOn={isOn} onClick={toggleSwitch}>
                  <motion.div className="handle" layout transition={spring} />
                </Box>
                </>
                : <></>}

                {data.orderStatus === 'DELIVERED' ? 
                <Box mx={'5'} mt={'5'}>
                    <Text fontFamily={'heading'} fontSize={'xl'} fontWeight={'semibold'} >Order completed !</Text>
                </Box>
                : <></>}
              <RadioGroup  defaultValue={data.deliveryTime} mx={'5'} mt={'5'}>
              <FormLabel>Delivery Time</FormLabel>
                <Stack direction='row'>
                  <Radio value='9:00 - 12:00' isDisabled>9:00 - 12:00</Radio>
                  <Radio value='14:00 - 17:00' isDisabled>14:00 - 17:00</Radio>
                  <Radio value='19:00 - 22:00' isDisabled>19:00 - 22:00</Radio>
                </Stack>
              </RadioGroup>
            </Grid>
        </Box>
       </motion.div>
      }</AnimatePresence>
    </motion.li>
    </>
  );
}

export default TodayOrders
