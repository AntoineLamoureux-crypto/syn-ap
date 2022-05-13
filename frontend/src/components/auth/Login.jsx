import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHouseUser } from 'react-icons/fa';
import { FaUserTie } from 'react-icons/fa';
import BgImage from './bg.png';

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Box,
  Link,
  Image,
} from '@chakra-ui/react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const activeLabelStyles = {
  transform: 'scale(0.95) translateY(-24px)',
};

export const theme = extendTheme({
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: 'left top',
            },
          },
        },
      },
    },
  },
});

function Login() {
  const navigate = useNavigate();

  const [deliverer, setDeliverer] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [employee, setEmployee] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    jobName: '',
  });

  const [userType, setUserType] = useState('Deliverer');

  const [error, setError] = useState('');

  function handleChangeEmployee(event) {
    const { name, value } = event.target;
    setEmployee((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function handleChangeDeliverer(event) {
    const { name, value } = event.target;
    setDeliverer((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userType === 'Employee') {
        fetch(
          `http://localhost:9090/login/employee/${employee.username}/${employee.password}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data === null) {
              setError('Wrong username or password');
            } else {
              localStorage.setItem('currentEmployee', JSON.stringify(data));
              window.location = '/';
            }
          });
      } else {
        fetch(
          `http://localhost:9090/login/deliverer/${deliverer.username}/${deliverer.password}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (data === null) {
              setError('Wrong username or password');
            } else {
              localStorage.setItem('currentDeliverer', JSON.stringify(data));
              window.location = '/';
            }
          });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError('Error username already taken');
      }
    }
  };

  return (
    <Box height={'100vh'} w={'100vw'}>
      <Box
        textAlign={'center'}
        w={'full'}
        height={'100%'}
        display={'inline-flex'}
      >
        <Box
          mx={'400px'}
          my={'200px'}
          boxShadow={'md'}
          p={20}
          borderRadius={'xl'}
        >
          <Box display={'inline-flex'} my={'4'} mx={'auto'}>
            <Button
              onClick={() => setUserType('Deliverer')}
              px={5}
              mx={5}
              size={'md'}
              borderRadius={'full'}
              bgColor={userType === 'Deliverer' ? 'turquoise' : 'gray.100'}
            >
              Deliverer
            </Button>
            <Button
              onClick={() => setUserType('Employee')}
              p={5}
              mx={5}
              size={'md'}
              borderRadius={'full'}
              bgColor={userType === 'Employee' ? 'turquoise' : 'gray.100'}
            >
              Employee
            </Button>
          </Box>
          <Stack spacing="6">
            <Box display={'flex'} flexWrap={'nowrap'} mx={'auto'}>
              <Box mx={'5'} my={'1'}>
                {userType === 'Deliverer' ? (
                  <FaHouseUser size={'40px'} />
                ) : (
                  <FaUserTie size={'40px'} />
                )}
              </Box>
            </Box>

            <ChakraProvider theme={theme}>
              <Box>
                <FormControl variant="floating" id="first-name" isRequired>
                  <Input
                    name="username"
                    type="username"
                    borderRadius={'xl'}
                    required
                    value={
                      userType === 'Deliverer'
                        ? deliverer.username
                        : employee.username
                    }
                    onChange={
                      userType === 'Deliverer'
                        ? handleChangeDeliverer
                        : handleChangeEmployee
                    }
                  />
                  <FormLabel>Username</FormLabel>
                </FormControl>
              </Box>
              <Box>
                <FormControl variant="floating" id="password" isRequired>
                  <Input
                    name="password"
                    type="password"
                    borderRadius={'xl'}
                    required
                    value={
                      userType === 'Deliverer'
                        ? deliverer.password
                        : employee.password
                    }
                    onChange={
                      userType === 'Deliverer'
                        ? handleChangeDeliverer
                        : handleChangeEmployee
                    }
                  />
                  <FormLabel>Password</FormLabel>
                </FormControl>
              </Box>
            </ChakraProvider>
            <Box>
              <Button
                onClick={handleSubmit}
                bgColor="turquoise"
                size="lg"
                fontSize="md"
                borderRadius={'md'}
                w={'70%'}
              >
                Sign in
              </Button>
            </Box>
            <Box>
              <Text textColor={'black'}>Dont have an account yet ?</Text>
              <Text>
                Sign up
                <Link ml="1" onClick={() => navigate('/signUp')}>
                  here
                </Link>
              </Text>
            </Box>
            {error ? <div style={{ color: 'red' }}>{error}</div> : <></>}
          </Stack>
        </Box>
        <Box
          display={'inline-flex'}
          py={'4'}
          bgColor={'turquoise'}
          w={'60vw'}
          borderTopLeftRadius={'45px'}
          borderBottomLeftRadius={'45px'}
        >
          <Box my={'auto'} mx={'auto'} ml={'65px'}>
            <Box display={'inline-flex'} flexDirection={'row'}>
              <Text
                fontSize={'50px'}
                fontStyle={'oblique'}
                fontWeight={'extrabold'}
                display={'flex'}
              >
                Livraison{' '}
                <Text ml={'2'} color={'red.400'} fontSize={'70px'}>
                  {' '}
                  E
                </Text>
                <Text mt={5}>xprexx</Text>
              </Text>
            </Box>
            <Image src={BgImage} w={'100%'} h={'100%'} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
