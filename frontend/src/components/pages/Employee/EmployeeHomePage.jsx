import React from 'react';
import SideBar from '../SideBar/SideBar';
import { useEffect, useState } from 'react';
import NewOrder from '../Order/NewOrder';
import AllOrders from '../Order/AllOrders';
import Home from './Home';
import { Box } from '@chakra-ui/react';
import Settings from '../global/Settings';
import UserDetails from '../global/UserDetails';

function EmployeeHomePage() {
  const [currentUser, setCurrentUser] = useState();
  const [currentOption, setCurrentOption] = useState('Home');

  useEffect(() => {
    const currentUserJSONFormat = localStorage.getItem('currentEmployee');
    const currentUser = JSON.parse(currentUserJSONFormat);
    setCurrentUser(currentUser);
  }, []);

  function chooseOption(option) {
    setCurrentOption(() => option);
  }

  function logout() {
    localStorage.clear();
    window.location = '/';
    window.location.reload(false);
  }

  return (
    <Box display={'inline-flex'} flexDirection={'row'} w="100%">
      <Box
        display={'inline-flex'}
        flexWrap={'nowrap'}
        flexGrow={'inherit'}
        flexDirection={'row'}
        w="100%"
        height={'97.5vh'}
      >
        <Box>
          <SideBar
            currentUser={currentUser}
            chooseOption={chooseOption}
            currentOption={currentOption}
          />
        </Box>
        <Box
          w="100%"
          mx={'5'}
          borderRadius={'xl'}
          mt="6"
          py="20"
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
          bgGradient={
            'linear(to-b, #97D9E1, , #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF, #FFFFFF)'
          }
        >
          <Box px="10" w="70%" mx={'auto'}>
            {currentOption === 'Add Order' ? (
              <NewOrder chooseOption={chooseOption} />
            ) : (
              <></>
            )}
            {currentOption === 'Home' ? <Home /> : <></>}
            {currentOption === 'All Orders' ? <AllOrders /> : <></>}
            {currentOption === 'Account' ? (
              <UserDetails user={currentUser} />
            ) : (
              <></>
            )}
            {currentOption === 'Settings' ? <Settings /> : <></>}
            {currentOption === 'Logout' ? logout() : <></>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EmployeeHomePage;
