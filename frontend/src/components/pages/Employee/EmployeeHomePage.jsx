import React from 'react'
import SideBar from '../SideBar/SideBar'
import { useEffect, useState } from 'react'
import NewOrder from '../Order/NewOrder'
import AllOrders from '../Order/AllOrders'
import Home from './Home'
import { Box } from '@chakra-ui/react'
import Settings from '../global/Settings'


function EmployeeHomePage() {
  const [ currentUser, setCurrentUser ] = useState('');
  const [ currentOption, setCurrentOption ] = useState('Home');

  useEffect(() => {
    const currentUserJSONFormat = localStorage.getItem("currentEmployee")
    const currentUser = JSON.parse(currentUserJSONFormat)
    setCurrentUser(currentUser)
  }, []);

  function chooseOption(option) {
    console.log('Choose option')
    setCurrentOption(() => option)
  } 

  function logout() {
    console.log('Logging out')
    localStorage.clear()
    window.location = '/'
    window.location.reload(false)

  }
  
  return (
    <Box display={'inline-flex'} flexDirection={'row'} w='100%'>
    <Box>
    <SideBar currentUser={ currentUser } chooseOption={ chooseOption } />
    </Box>
    <Box w='100%' mx={'5'} borderRadius={'xl'} mt='6' boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)" bgColor={'gray.100'} py='20'>
       <Box bgColor={'white'} borderRadius={'2xl'} px='10' w='70%' mx={'auto'}>
         {currentOption === 'Add Order' ? <NewOrder chooseOption={chooseOption} /> : <></> }
         {currentOption === 'Home' ? <Home /> : <></> }
         {currentOption === 'All Orders' ? <AllOrders /> : <></> }
         {currentOption === 'Settings' ? <Settings /> : <></> }
         {currentOption === 'Logout' ? logout() : <></> }
       </Box>
    </Box>
    </Box>
  )
}

export default EmployeeHomePage