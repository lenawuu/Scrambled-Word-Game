// From Chakra tutorial
import { Flex, Box, Heading, Button, Text, Spacer, HStack, IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, // Possible future settings screen implementation
  useColorMode
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import React from 'react'

export default function Navbar({loadHomePage}) {

  const { colorMode, toggleColorMode } = useColorMode();

  const handleClick = () =>{
    loadHomePage();
  }

  return (
    <Flex as="nav" alignItems="left" top={0} left={0} width="100%"> 
      <Heading as="h1" onClick={handleClick} cursor="pointer">ekreb.</Heading> 
      <Spacer/>
      <HStack spacing="20px">
        <Box
            as={colorMode === 'light' ? MoonIcon : SunIcon}
            width="32px"
            height="32px"
            onClick={toggleColorMode}
            cursor="pointer"
            _hover={{
              color: 'teal.500', // Change the color on hover
            }}
          />
      </HStack>
    </Flex>
  )
}
