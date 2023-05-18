import { Box, HStack, Image, Show, Text, } from '@chakra-ui/react'
import logo from '../assets/bitwise_logo.png'

const NavBar = () => {
  return (
    <HStack justifyContent='space-between' padding='10px' className='nav'>
        <Image src={logo} boxSize='60px' />

        <HStack>
          <Show above='lg'>
            <Box px={4}>
                Home
            </Box>
            <Box px={4}>
                Login
            </Box>
            <Box px={4}>
                Sign Up
            </Box>
          </Show>
          <Text>colour switch</Text>
          <Show below='lg'>
            hamberger
          </Show>
        </HStack>
    </HStack>
  )
}

export default NavBar
