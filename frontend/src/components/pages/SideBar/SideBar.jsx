import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Box
} from '@chakra-ui/react'

import {
    FiMenu,
    FiHome,
    FiUser,
    FiSettings
} from 'react-icons/fi'

import { BiLogOut } from 'react-icons/bi'
import { MdOutlineCreateNewFolder } from 'react-icons/md'
import { VscFiles } from 'react-icons/vsc' 

import NavItem from './NavItem'

function Sidebar({ currentUser, chooseOption }) {
    const currentDeliverer= localStorage.getItem("currentDeliverer")
    const currentEmployee = localStorage.getItem("currentEmployee")

    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize === "small" ? "15px" : "30px"}
            w={navSize === "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
            ml='5'
            bgColor={'blue.100'}
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize === "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem navSize={navSize} icon={FiHome} title="Home" description="This is the description for the dashboard." chooseOption={ chooseOption } />
                {currentEmployee ? <NavItem navSize={navSize} icon={VscFiles} title="All Orders"  chooseOption={ chooseOption }/>: <></>}
                {currentEmployee ? <NavItem navSize={navSize} icon={MdOutlineCreateNewFolder} title="Add Order"  chooseOption={ chooseOption }/>: <></>}
                {currentDeliverer ? <NavItem navSize={navSize} icon={FiUser} title="My Deliveries" chooseOption={ chooseOption }/>: <></>}
                <NavItem navSize={navSize} icon={FiSettings} title="Settings"  chooseOption={ chooseOption }/>
                <Box w={'100%'} alignItems={'flex-end'}>
                    <NavItem navSize={navSize} icon={BiLogOut} title="Logout" chooseOption={ chooseOption }/>
                </Box>
               
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize === "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm">{currentUser.firstName} {currentUser.lastName}</Heading>
                        {currentDeliverer ? <Text my={'1'} color="gray">Deliverer</Text> : <Text my={'1'} color="gray">Employee</Text>}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}
export default Sidebar