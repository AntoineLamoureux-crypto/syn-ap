import React, { useState, useEffect } from 'react';
import { Box, HStack, Grid, GridItem, Text, Button } from '@chakra-ui/react';
import {
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
  Image,
  Icon,
  ListIcon,
  List,
  Flex,
  Avatar,
  Badge,
} from '@chakra-ui/react';
import { Link, Spinner } from '@chakra-ui/react';

import { FaHandSparkles } from 'react-icons/fa';

import DeliveryPicture from '../Deliverer/delivery.jpg';
import { RiShieldUserLine } from 'react-icons/ri';
import { BsCart4, BsArrowRightShort } from 'react-icons/bs';
import { BiPackage } from 'react-icons/bi';
import { MdDeliveryDining, MdCheckCircle } from 'react-icons/md';
import { Line } from 'react-chartjs-2';

function Home() {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const data = {
    labels: [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ],
    datasets: [
      {
        label: 'Semaine dernière',
        data: [12, 20, 42, 18, 56, 55, 27],
        fill: true,
        borderColor: '#21215c',
        borderRadius: 5,
        backgroundColor: '#9797cc',
      },
      {
        label: 'Semaine courante',
        data: [16, 12, 35, 40, 46, 60, 62],
        fill: true,
        borderColor: '#19fffb',
        borderRadius: 5,
        backgroundColor: '#97D9E1',
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: 'Nombre de commandes des deux dernière semaines',
      fontColor: 'black',
    },
    scales: {
      yAxes: [
        {
          gridLines: {
            lineWidth: 2,
            display: false,
          },
          ticks: {
            display: true,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            lineWidth: 2,
            display: false,
          },
          ticks: {
            display: true,
          },
        },
      ],
    },
    legend: {
      display: true,
    },
  };

  function getStats() {
    fetch('http://localhost:9090/getGeneralStats')
      .then((response) => response.json())
      .then((data) => setStats(data));
    console.log(stats);
  }

  function setData() {
    fetch('http://localhost:9090/getAllOrders')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .then(setLoading(false));
  }

  useEffect(() => {
    setData();
    getStats();
  }, []);

  return (
    <Box w={'full'}>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        <Box
          display={'block'}
          w={'full'}
          boxShadow={'md'}
          borderRadius={'lg'}
          height={'110px'}
          p={3}
          px={4}
          bgGradient={'linear(to-b, #97D9E1, #FFFFFF)'}
        >
          <Text fontSize={'smaller'} fontWeight={'semibold'} color={'black'}>
            Nombre de livraisons Aujourd'hui
          </Text>
          <Box display={'flex'} justifyContent={'flex-end'} pt={1}>
            <Stat>
              <StatNumber>3</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                30%
              </StatHelpText>
            </Stat>
            <Box p={1} my={'auto'} bgColor={'turquoise'} borderRadius={'lg'}>
              <Icon as={BsCart4} color={'white'} boxSize={'40px'} />
            </Box>
          </Box>
        </Box>
        <Box
          display={'block'}
          w={'full'}
          boxShadow={'md'}
          borderRadius={'lg'}
          height={'110px'}
          p={3}
          px={4}
          bgGradient={'linear(to-b, #97D9E1, #FFFFFF)'}
        >
          <Text fontSize={'smaller'} fontWeight={'semibold'} color={'black'}>
            Satisfaction des clients
          </Text>
          <Box display={'flex'} justifyContent={'flex-end'} pt={1}>
            <Stat>
              <StatNumber>4.5</StatNumber>
              <StatHelpText>
                <StatArrow type="decrease" />
                2.36%
              </StatHelpText>
            </Stat>
            <Box p={1} my={'auto'} bgColor={'turquoise'} borderRadius={'lg'}>
              <Icon as={RiShieldUserLine} color={'white'} boxSize={'40px'} />
            </Box>
          </Box>
        </Box>
        <Box
          display={'block'}
          w={'full'}
          boxShadow={'md'}
          borderRadius={'lg'}
          height={'110px'}
          p={3}
          px={4}
          bgGradient={'linear(to-b, #97D9E1, #FFFFFF)'}
        >
          <Text fontSize={'smaller'} fontWeight={'semibold'} color={'black'}>
            Nombre de commandes ce mois
          </Text>
          <Box display={'flex'} justifyContent={'flex-end'} pt={1}>
            <Stat>
              <StatNumber>{stats[2]}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {(stats[2] * 100) / stats[0]}%
              </StatHelpText>
            </Stat>
            <Box p={1} my={'auto'} bgColor={'turquoise'} borderRadius={'lg'}>
              <Icon as={MdDeliveryDining} color={'white'} boxSize={'40px'} />
            </Box>
          </Box>
        </Box>
        <Box
          display={'block'}
          w={'full'}
          boxShadow={'md'}
          borderRadius={'lg'}
          height={'11 0px'}
          p={3}
          px={4}
          bgGradient={'linear(to-b, #97D9E1, #FFFFFF)'}
        >
          <Text fontSize={'smaller'} fontWeight={'semibold'} color={'black'}>
            Nombre de commandes total
          </Text>
          <Box display={'flex'} justifyContent={'flex-end'} pt={0.5}>
            <Stat>
              <StatNumber>{stats[0]}</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                {100}%
              </StatHelpText>
            </Stat>
            <Box p={1} my={'auto'} bgColor={'turquoise'} borderRadius={'lg'}>
              <Icon as={BiPackage} color={'white'} boxSize={'40px'} />
            </Box>
          </Box>
        </Box>
      </Grid>
      <HStack pt={5}>
        <Box w={'full'}>
          <Grid templateColumns="repeat(5, 1fr)" gap={4}>
            <GridItem
              colSpan={3}
              boxShadow={'md'}
              borderRadius={'md'}
              height={'280px'}
              bgColor={'white'}
            >
              <Box display={'flex'} justifyContent={'flex-end'} pt={1}>
                <Box p={'7%'}>
                  <Box
                    display={'flex'}
                    pr={'15%'}
                    flexWrap={'wrap'}
                    position={'relative'}
                  >
                    <Box pl={'20px'} pb={2}>
                      <Text fontWeight={'semibold'} fontSize={'lg'}>
                        Bienvenue !
                      </Text>
                    </Box>
                    <Box display={'flex'} position={'absolute'} pt={4} pr={1}>
                      <Text
                        fontStyle={'initial'}
                        fontWeight={'bold'}
                        fontSize={'35px'}
                        color={'turquoise'}
                      >
                        A
                      </Text>
                      <Text
                        fontStyle={'initial'}
                        fontWeight={'hairline'}
                        fontSize={'md'}
                        display={'flex'}
                        pt={'17px'}
                      >
                        ntoine Lamoureux
                      </Text>
                    </Box>
                  </Box>
                  <Link pt={20} display={'flex'}>
                    <Text fontSize={'smaller'}>Détails du compte</Text>
                    <Box pl={1} pt={0.5}>
                      <Icon
                        as={BsArrowRightShort}
                        boxSize={'40px'}
                        color={'transparent'}
                      />
                    </Box>
                  </Link>
                </Box>
                <Box h={'280px'} w={'320px'} pt={5} pr={6}>
                  <Image src={DeliveryPicture}></Image>
                </Box>
              </Box>
            </GridItem>
            <GridItem colSpan={2} boxShadow={'md'} borderRadius={'md'} p={3}>
              <List display={'flex'}>
                <ListIcon
                  as={MdCheckCircle}
                  boxSize={'18px'}
                  color="green.500"
                />
                <Text fontSize={'md'} fontWeight={'semibold'}>
                  Les commandes les plus récentes
                </Text>
              </List>
              <Box mt={2} w={'full'}>
                {loading ? (
                  <Spinner />
                ) : (
                  items.slice(0, 2).map((item) => (
                    <Box
                      key={item.id}
                      value={item}
                      display={'flex'}
                      justifyContent={'space-between'}
                      gap={4}
                      bgColor={'white'}
                      boxShadow={'md'}
                      _hover={{ boxShadow: 'xl' }}
                      borderRadius={'md'}
                      m={5}
                      p={3}
                    >
                      <Box>
                        <Text fontWeight={'normal'} fontSize={'sm'}>
                          {item.clientName}
                        </Text>
                        <Text fontWeight={'bold'} fontSize={'15px'}>
                          {item.deliveryAddress}
                        </Text>
                      </Box>
                      <Box pl={0}>
                        <Text fontWeight={'bold'} fontSize={'15px'}>
                          {item.deliveryTime}
                        </Text>
                        <Button
                          size={'xm'}
                          bgColor={'green.200'}
                          p={1}
                          borderRadius={'sm'}
                        >
                          <Text fontSize={'smaller'} mr={1}>
                            Prendre en
                          </Text>
                          <FaHandSparkles />
                        </Button>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </GridItem>
          </Grid>
          <Box mt={5}>
            <Grid templateColumns="repeat(7, 1fr)" gap={4}>
              <GridItem
                colSpan={4}
                position={'relative'}
                boxShadow={'md'}
                borderRadius={'md'}
                p={4}
              >
                <Line data={data} options={options} />
              </GridItem>
              <GridItem
                colSpan={3}
                pos={'relative'}
                boxShadow={'md'}
                borderRadius={'md'}
                p={4}
                bgGradient={'linear(to-t, #97D9E1, #FFFFFF)'}
              >
                <Text fontSize={'lg'} fontWeight={'semibold'}>
                  Votre équipe
                </Text>
                <Flex p={3} w={'max'}>
                  <Avatar src="" />
                  <Box ml="3">
                    <Text fontWeight="bold">
                      Pierre Bertrand
                      <Badge ml="1" colorScheme="green">
                        Livreur
                      </Badge>
                    </Text>
                    <Text fontSize="sm">IGA Vanhorne</Text>
                  </Box>
                </Flex>
                <Flex p={3} w={'max'}>
                  <Avatar src="" />
                  <Box ml="3">
                    <Text fontWeight="bold">
                      Ginette Sauvé
                      <Badge ml="1" colorScheme="blue">
                        Employee
                      </Badge>
                    </Text>
                    <Text fontSize="sm">IGA Vanhorne</Text>
                  </Box>
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </Box>
      </HStack>
      <HStack>
        <Box></Box>
        <Box></Box>
      </HStack>
    </Box>
  );
}

export default Home;
