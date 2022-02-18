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


function SignUp() {

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
                const { data: res } = await axios.post('http://localhost:9090/signUp/employee', employee);
                if (res.data === null) {
                    setError('Another Employee with the same username was found')
                }
                else {
                    window.location = "/";
                }
            }
            else if (userType === 'Deliverer'){
                const { data: res } = await axios.post('http://localhost:9090/signUp/deliverer', deliverer);
                if (res.data === null) {
                    setError('Another Deliverer with the same username was found')
                }
                else {
                    window.location = "/";
                }
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
                <Text alignContent={'center'} fontSize={'xx-large'} fontWeight={'bold'}>Sign up for {userType}</Text><Box mx={'5'} my={'1'}>{userType === 'Deliverer' ? <FaHouseUser size={'40px'}/> : <FaUserTie size={'40px'} />}</Box>
            </Box>
            <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input name="username" type="username" required value={ userType === 'Deliverer' ? deliverer.username : employee.username } onChange={ userType === 'Deliverer' ? handleChangeDeliverer : handleChangeEmployee }/>
            </FormControl>
            <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" required value={ userType === 'Deliverer' ? deliverer.password : employee.password } onChange={ userType === 'Deliverer' ? handleChangeDeliverer : handleChangeEmployee }/>
            </FormControl>
            <FormControl id="firstName">
                <FormLabel>First Name</FormLabel>
                <Input name="firstName" type="text" required value={ userType === 'Deliverer' ? deliverer.firstName : employee.firstName } onChange={ userType === 'Deliverer' ? handleChangeDeliverer : handleChangeEmployee } />
            </FormControl>
            <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input name="lastName" type="text" required value={ userType === 'Deliverer' ? deliverer.lastName : employee.lastName } onChange={ userType === 'Deliverer' ? handleChangeDeliverer : handleChangeEmployee }/>
            </FormControl>
            {userType === 'Employee' ? 
                <FormControl id="jobName">
                    <FormLabel>Job Name</FormLabel>
                    <Input name="jobName" type="text" required value={ employee.jobName } onChange={ handleChangeEmployee }/>
                </FormControl> : <></>
            }
            <Button onClick= { handleSubmit } colorScheme="blue" size="lg" fontSize="md">
                Sign up as {userType === 'Employee' ? 'an ' : 'a '}{userType}
            </Button>
            <Box>
                <Text textColor={ "black" }>Already have an account ?</Text>
                <Text>Sign in
                    <Link ml='1' onClick={ () => navigate('/') }>here</Link>
                </Text>
            </Box>
            { error ? <div style={{color: 'red'}}>{ error }</div> : <></> }
        </Stack>
    </Container>
  )
}

export default SignUp