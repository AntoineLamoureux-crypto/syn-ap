import React from 'react';
import SideBar from '../SideBar/SideBar';
import { useEffect, useState } from 'react';
import TodayOrders from '../Order/TodayOrders';
import { Box } from '@chakra-ui/react';
import Settings from '../global/Settings';

import Home from './Home';
import UserDetails from '../global/UserDetails';

function DelivererHomePage() {
  const [currentUser, setCurrentUser] = useState('');
  const [currentOption, setCurrentOption] = useState('Home');

  useEffect(() => {
    const currentUserJSONFormat = localStorage.getItem('currentDeliverer');
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
    <Box
      display={'inline-flex'}
      flexWrap={'nowrap'}
      flexGrow={'inherit'}
      flexDirection={'row'}
      w="100%"
      height={'97.5vh'}
      bgGradient={'linear(to-b, #97D9E1, #FFFFFF)'}
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
        bgColor={'white'}
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      >
        <Box px="10" w="70%" mx={'auto'}>
          {currentOption === 'Home' ? <Home /> : <></>}
          {currentOption === 'My Deliveries' ? (
            <>
              <Box display={'flex'} flexDirection={'column'}>
                <TodayOrders />
              </Box>
            </>
          ) : (
            <></>
          )}
          {currentOption === 'Account' ? (
            <>
              <Box display={'flex'} flexDirection={'column'}>
                <UserDetails currentUser={currentUser} />
              </Box>
            </>
          ) : (
            <></>
          )}
          {currentOption === 'Settings' ? (
            <>
              <Box display={'flex'} flexDirection={'column'}>
                <Settings />
              </Box>
            </>
          ) : (
            <></>
          )}
          {currentOption === 'Logout' ? logout() : <></>}
        </Box>
      </Box>
    </Box>
  );
}

export default DelivererHomePage;
