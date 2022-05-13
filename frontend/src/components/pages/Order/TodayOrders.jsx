import React from 'react';
import { Text, Box } from '@chakra-ui/react';
import './css/Styles.css';
import TodayFinalList from './TodayOrdersFinal';

function TodayOrders() {
  return (
    <>
      <Box mx={'auto'}>
        <Text
          fontFamily={'heading'}
          fontSize={'30px'}
          fontWeight={'semibold'}
          my={'3'}
        >
          Mes commandes
        </Text>
      </Box>
      <Box my={5} w={'full'}>
        <TodayFinalList />
      </Box>
    </>
  );
}

export default TodayOrders;
