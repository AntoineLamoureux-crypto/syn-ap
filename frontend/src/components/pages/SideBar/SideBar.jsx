import React, { useState } from 'react';
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Box,
} from '@chakra-ui/react';

import { FiMenu, FiHome, FiUser, FiSettings } from 'react-icons/fi';

import { BiLogOut } from 'react-icons/bi';
import { MdOutlineCreateNewFolder, MdDeliveryDining } from 'react-icons/md';
import { VscFiles } from 'react-icons/vsc';
import NavItem from './NavItem';

function Sidebar({ currentUser, chooseOption, currentOption }) {
  const currentDeliverer = localStorage.getItem('currentDeliverer');
  const currentEmployee = localStorage.getItem('currentEmployee');
  const [navSize, changeNavSize] = useState('large');

  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={'xl'}
      w={navSize === 'small' ? '75px' : '200px'}
      flexDir="column"
      justifyContent="space-between"
      ml="5"
      bgColor={'white'}
      bgGradient={
        'linear(to-b, #97D9E1, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF)'
      }
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        as="nav"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: 'none' }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === 'small') changeNavSize('large');
            else changeNavSize('small');
          }}
        />
        <NavItem
          navSize={navSize}
          icon={FiHome}
          title="Home"
          description="This is the description for the dashboard."
          chooseOption={chooseOption}
          currentOption={currentOption}
        />
        {currentEmployee ? (
          <NavItem
            navSize={navSize}
            icon={VscFiles}
            title="All Orders"
            chooseOption={chooseOption}
          />
        ) : (
          <></>
        )}
        {currentEmployee ? (
          <NavItem
            navSize={navSize}
            icon={MdOutlineCreateNewFolder}
            title="Add Order"
            chooseOption={chooseOption}
            currentOption={currentOption}
          />
        ) : (
          <></>
        )}
        {currentDeliverer ? (
          <NavItem
            navSize={navSize}
            icon={MdDeliveryDining}
            title="My Deliveries"
            chooseOption={chooseOption}
            currentOption={currentOption}
          />
        ) : (
          <></>
        )}
        {navSize === 'small' ? (
          <></>
        ) : (
          <Text fontSize={'md'} fontWeight={'medium'} py={'2'} pl={3}>
            Account Pages
          </Text>
        )}
        <NavItem
          navSize={navSize}
          icon={FiUser}
          title="Account"
          chooseOption={chooseOption}
          currentOption={currentOption}
        />
        <NavItem
          navSize={navSize}
          icon={FiSettings}
          title="Settings"
          chooseOption={chooseOption}
          currentOption={currentOption}
        />
        <Box w={'100%'} alignItems={'flex-end'}>
          <NavItem
            navSize={navSize}
            icon={BiLogOut}
            title="Logout"
            chooseOption={chooseOption}
            currentOption={currentOption}
          />
        </Box>
      </Flex>
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        mb={4}
      >
        <Divider
          display={navSize === 'small' ? 'none' : 'flex'}
          borderColor={'gray'}
        />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize === 'small' ? 'none' : 'flex'}
          >
            <Heading size="sm" color={'gray'} fontWeight={'hairline'}>
              {currentUser.firstName} {currentUser.lastName}
            </Heading>
            {currentDeliverer ? (
              <Text
                my={'1'}
                color="orange.400"
                fontStyle={'oblique'}
                fontWeight={'semibold'}
                fontSize={'smaller'}
              >
                Deliverer
              </Text>
            ) : (
              <Text my={'1'} color="gray">
                Employee
              </Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
export default Sidebar;
