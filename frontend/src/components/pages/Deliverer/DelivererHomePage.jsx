import React from 'react'
import SideBar from '../SideBar/SideBar'
import { useEffect, useState } from 'react'
import TodayOrders from '../Order/TodayOrders'
import { Box, useColorMode } from '@chakra-ui/react'
import Settings from '../global/Settings'

function DelivererHomePage() {
  const [ currentUser, setCurrentUser ] = useState('');
  const [ currentOption, setCurrentOption ] = useState('My Deliveries');
  const { colorMode } = useColorMode()

  useEffect(() => {
    const currentUserJSONFormat = localStorage.getItem("currentDeliverer")
    const currentUser = JSON.parse(currentUserJSONFormat)
    setCurrentUser(currentUser)
  }, []);

  function chooseOption(option) {
    setCurrentOption(() =>option)
  } 

  function logout() {
    localStorage.clear()
    window.location = '/'
    window.location.reload(false)

  }
  
  return (
    <Box display={'inline-flex'} flexDirection={'row'} w='100%'>
      <Box>
        <SideBar currentUser={ currentUser } chooseOption={ chooseOption } />
      </Box>
      <Box w='100%' mx={'5'} borderRadius={'xl'} mt='6' boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)" py='20'  bgColor={colorMode === 'light' ? 'gray.100' : 'gray.900'}>
        <Box bgColor={colorMode === 'light' ? 'gray.100' : 'gray.700'} borderRadius={'2xl'} px='10' w='70%' mx={'auto'} h={'-webkit-fit-content'}>
          {currentOption === 'My Deliveries' ? <><Box display={'flex'} flexDirection={'column'}><TodayOrders /></Box></> : <></> }
          {currentOption === 'Settings' ? <><Box display={'flex'} flexDirection={'column'}><Settings /></Box></> : <></> }
          {currentOption === 'Logout' ? logout() : <></> }
        </Box>
      </Box>
    </Box>
  )
}

export default DelivererHomePage