import React from 'react';
import {
  Box,
  Stack,
  HStack,
  Grid,
  GridItem,
  Text,
  Button,
} from '@chakra-ui/react';
import { Icon, Avatar, Badge } from '@chakra-ui/react';
import { MdControlPoint } from 'react-icons/md';
import { GrCompliance } from 'react-icons/gr';

function UserDetails({ currentUser }) {
  return (
    <Grid templateColumns={'repeat(2, 1fr)'} templateRows={'repeat(3, 1fr)'}>
      <GridItem
        colSpan={'2'}
        bgColor={'#97D9E1'}
        borderRadius={'xl'}
        px={'auto'}
      >
        <Box
          w={'auto'}
          h={'100px'}
          bgGradient={'linear(to-b, #97D9E1, #97D9E1, #97D9E1)'}
          borderRadius={'xl'}
        ></Box>
        <Box
          display={'flex'}
          bgGradient={'linear(to-t, #97D9E1, #FFFF)'}
          height={'120px'}
          position={'relative'}
          borderRadius={'xl'}
          mx={20}
        >
          <Box my={'auto'} ml={6}>
            <Avatar borderRadius={'xl'} size={'lg'} />
          </Box>
          <Box my={'auto'} ml={6} display={'block'}>
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              {currentUser.firstName} {currentUser.lastName}
            </Text>
            <Text fontSize={'sm'} color={'gray'} fontWeight={'semibold'}>
              {currentUser.username}
            </Text>
          </Box>
          <Box my={'auto'} display={'block'} ml={'auto'} mr={6}>
            <Button
              borderRadius={'full'}
              mx={3}
              bgColor={'rgba(209, 209, 209, 0.32)'}
              size={'sm'}
              p={4}
            >
              Overview
            </Button>
            <Button
              borderRadius={'full'}
              mx={3}
              bgColor={'rgba(209, 209, 209, 0.32)'}
              size={'sm'}
              p={4}
            >
              My Team
            </Button>
            <Button
              borderRadius={'full'}
              mx={3}
              bgColor={'rgba(209, 209, 209, 0.32)'}
              size={'sm'}
              p={4}
            >
              My Deliveries
            </Button>
          </Box>
        </Box>
      </GridItem>
      <GridItem colSpan={'2'} w={'full'} px={'auto'}>
        <Grid templateColumns={'repeat(3, 1fr)'} gap={5} pt={5}>
          <GridItem colSpan={'1'} px={'auto'}>
            <Box display={'flex'} p={1} m={2} borderRadius={'sm'}>
              <Box
                as="section"
                pt={{ base: '4', md: '8' }}
                pb={{ base: '12', md: '24' }}
              >
                <Box
                  bg="bg-surface"
                  px={{ base: '4', md: '6' }}
                  py="5"
                  borderRadius="lg"
                  shadow={'lg'}
                >
                  <Stack spacing="4" direction={'row'}>
                    <HStack>
                      <Icon
                        as={MdControlPoint}
                        bgColor={'darkcyan'}
                        borderRadius={'xl'}
                        size={'50px'}
                        p={1}
                        boxSize={{ base: '12', sm: '14' }}
                        boxShadow={'sm'}
                      />
                      <Box>
                        <HStack>
                          <Badge variant="subtle" colorScheme="blue">
                            POINTS
                          </Badge>
                        </HStack>
                        <Text color="muted" fontSize="sm">
                          {currentUser.points}
                        </Text>
                      </Box>
                    </HStack>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </GridItem>

          <GridItem colSpan={'1'} w={'full'} px={'auto'}>
            <Box display={'flex'} p={1} m={2} borderRadius={'sm'}>
              <Box
                as="section"
                pt={{ base: '4', md: '8' }}
                pb={{ base: '12', md: '24' }}
              >
                <Box
                  bg="bg-surface"
                  px={{ base: '4', md: '6' }}
                  py="5"
                  borderRadius="lg"
                  shadow={'lg'}
                >
                  <Stack spacing="4" direction={'row'}>
                    <HStack>
                      <Icon
                        as={GrCompliance}
                        bgColor={'darkcyan'}
                        borderRadius={'xl'}
                        size={'50px'}
                        p={2}
                        color={'white'}
                        boxSize={{ base: '12', sm: '14' }}
                        boxShadow={'sm'}
                      />
                      <Box>
                        <HStack>
                          <Badge variant="subtle" colorScheme="blue">
                            Orders Completed
                          </Badge>
                        </HStack>
                        <Text color="muted" fontSize="sm">
                          {currentUser.totalOrdersCompleted}
                        </Text>
                      </Box>
                    </HStack>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </GridItem>
          <GridItem colSpan={'1'} w={'full'} px={'auto'}>
            <Box display={'flex'} p={1} m={2} borderRadius={'sm'}>
              <Box
                as="section"
                pt={{ base: '4', md: '8' }}
                pb={{ base: '12', md: '24' }}
              >
                <Box
                  bg="bg-surface"
                  px={{ base: '4', md: '6' }}
                  py="5"
                  borderRadius="lg"
                  shadow={'lg'}
                >
                  <Stack spacing="4" direction={'row'}>
                    <HStack>
                      <Icon
                        as={GrCompliance}
                        bgColor={'darkcyan'}
                        borderRadius={'xl'}
                        size={'50px'}
                        p={2}
                        color={'white'}
                        boxSize={{ base: '12', sm: '14' }}
                        boxShadow={'sm'}
                      />
                      <Box>
                        <HStack>
                          <Badge variant="subtle" colorScheme="blue">
                            Overview
                          </Badge>
                        </HStack>
                        <Text color="muted" fontSize="sm">
                          {currentUser.username}
                        </Text>
                      </Box>
                    </HStack>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
}

export default UserDetails;
