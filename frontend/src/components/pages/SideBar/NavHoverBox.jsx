import React from 'react';
import { Flex, Heading, Text, Icon } from '@chakra-ui/react';

export default function NavHoverBox({ title, icon, description }) {
  return (
    <>
      <Flex
        pos="absolute"
        mt="calc(100px - 7.5px)"
        ml="-10px"
        width={0}
        height={0}
        borderTop="10px solid transparent"
        borderBottom="10px solid transparent"
        borderRight="10px solid #82AAAD"
      />
      <Flex
        h={200}
        w="100%"
        flexDir="column"
        alignItems="center"
        justify="center"
        backgroundColor="white"
        borderRadius="10px"
        color="#fff"
        textAlign="center"
      >
        <Icon color={'turquoise'} as={icon} fontSize="3xl" mb={4} />
        <Heading textColor={'turquoise'} size="md" fontWeight="normal" pb={2}>
          {title}
        </Heading>
        <Text textColor={'gray'} fontSize={'smaller'} fontWeight="normal">
          {description}
        </Text>
      </Flex>
    </>
  );
}
