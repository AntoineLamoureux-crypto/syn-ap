import React from 'react';
import {
  Flex,
  Text,
  Icon,
  Link,
  Menu,
  MenuButton,
  Box,
} from '@chakra-ui/react';

export default function NavItem({
  icon,
  title,
  navSize,
  chooseOption,
  currentOption,
}) {
  return (
    <Flex
      mb={5}
      flexDir="column"
      w="100%"
      alignItems={navSize === 'small' ? 'center' : 'flex-start'}
    >
      <Menu placement="right">
        <Link
          p={3}
          borderRadius={8}
          w={navSize === 'large' && '100%'}
          boxShadow={currentOption === title ? 'md' : 'none'}
        >
          <MenuButton w="100%" onClick={() => chooseOption(title)}>
            <Box display={'flex'} justifyContent={'flex-start'}>
              <Box
                px={2}
                bgColor={currentOption === title ? 'turquoise' : 'none'}
                pb={0.5}
                pt={2}
                borderRadius={'full'}
              >
                <Icon
                  as={icon}
                  fontSize="xl"
                  color={currentOption === title ? 'white' : 'turquoise'}
                />
              </Box>
              <Box my={'auto'}>
                <Text
                  ml={5}
                  display={navSize === 'small' ? 'none' : 'flex'}
                  fontFamily={'heading'}
                  fontWeight={'semibold'}
                  textColor={currentOption === title ? 'black' : 'gray'}
                >
                  {title}
                </Text>
              </Box>
            </Box>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
}
