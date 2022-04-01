import React from 'react'
import { useColorMode, Box, Button } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from "@chakra-ui/icons"


function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <>
    <Box cursor={'pointer'}>
      {colorMode === 'light' ? <Button  onClick={toggleColorMode}><SunIcon  boxSize={'15px'}/></Button> : <Button onClick={toggleColorMode}><MoonIcon boxSize={'15px'}/> </Button>}
    </Box>
    </>
  )
}

export default ColorMode