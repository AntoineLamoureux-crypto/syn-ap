import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";


import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Container,
    Text,
    Box,
    Link,
  } from '@chakra-ui/react'

function Login() {
    const navigate = useNavigate();

    const [deliverer, setDeliverer] = useState({
        username: "",
        password: "",
		firstName: "",
		lastName: "",
	});

    const [employee, setEmployee] = useState({
        username: "",
        password: "",
		firstName: "",
		lastName: "",
        jobName: "",
	});

    const [userType, setUserType] = useState('Deliverer')

    const [error, setError] = useState('');

    function handleChangeEmployee(event) {
        const {name, value} = event.target
        setEmployee(prevInput => {
          return ({
            ...prevInput,
            [name] : value,
          });
        });
    }

    function handleChangeDeliverer(event) {
        const {name, value} = event.target
        setDeliverer(prevInput => {
          return ({
            ...prevInput,
            [name] : value,
          });
        });
    }

    const handleSubmit = async (e) => {
	    e.preventDefault();
        try {
            if (userType === 'Employee') {
                fetch(`http://localhost:9090/login/employee/${employee.username}/${employee.password}`)
                .then(response => response.json())
                .then(data => {
                    if (data === null) {
                        setError('Wrong username or password')
                    }
                    else {
                        localStorage.setItem("currentEmployee", JSON.stringify(data));
                        window.location = '/';
                    }
                })
                
            }
            else {
                fetch(`http://localhost:9090/login/deliverer/${deliverer.username}/${deliverer.password}`)
                .then(response => response.json())
                .then(data => {
                    if (data === null) {
                        setError('Wrong username or password')
                    }
                    else {
                        localStorage.setItem("currentDeliverer", JSON.stringify(data));
                        window.location = '/';
                    }
                })
            }
		    
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError('Error username already taken')
			}
		}
		
	};

  return (
    <Container boxSize={'container.xl'} textAlign={'center'} mt={'10'} >
        <Box display={'inline-flex'} my={'4'} mx={'auto'}>
        <Button onClick={() => setUserType('Deliverer')} mx='5' size={"lg"}>Deliverer</Button>
        <Button onClick={() => setUserType('Employee')} mx='5' size={"lg"}>Employee</Button>
        </Box>
        <Stack spacing="6">
            <Box display={'flex'} my={'4'} mx={'auto'}>
                <Text alignContent={'center'} fontSize={'xx-large'} fontWeight={'bold'}>Sign in as {userType === 'Deliverer' ? 'a' : 'an'} {userType}</Text><Box mx={'5'} my={'1'}>{userType === 'Deliverer' ? <FaHouseUser size={'40px'}/> : <FaUserTie size={'40px'} />}</Box>
            </Box>
            <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input name="username" type="username" required value={ userType === 'Deliverer' ? deliverer.username : employee.username } onChange={ userType === 'Deliverer' ? handleChangeDeliverer : handleChangeEmployee }/>
            </FormControl>
            <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" required value={ userType === 'Deliverer' ? deliverer.password : employee.password } onChange={ userType === 'Deliverer' ? handleChangeDeliverer : handleChangeEmployee }/>
            </FormControl>
            <Button onClick= { handleSubmit } colorScheme="blue" size="lg" fontSize="md">
                Sign in as {userType === 'Employee' ? 'an ' : 'a '}{userType}
            </Button>
            <Box>
                <Text textColor={ "black" }>Dont have an account yet ?</Text>
                <Text>Sign up
                    <Link ml='1' onClick={ () => navigate('/signUp') }>here</Link>
                </Text>
            </Box>
            { error ? <div style={{color: 'red'}}>{ error }</div> : <></> }
        </Stack>
    </Container>
  )
}

export default Login