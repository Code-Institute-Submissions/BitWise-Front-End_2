import { Box, HStack, Image, Show, Text, } from '@chakra-ui/react'
import logo from '../assets/bitwise_logo.png'
import { Link, NavLink } from 'react-router-dom';
import ColorThemeSwitch from './ColorThemeSwitch';

const NavBar = () => {
  return (
    <HStack bg='grey' justifyContent='space-between' padding='10px' className='nav'>
        <Link to="/">
          <Image src={logo} boxSize='50px' m='5px' />
        </Link>

        <HStack>
          <Show above='lg'>
          <Box px={4}>
            <NavLink to="/" >Home</NavLink>
          </Box>
          <Box px={4}>
            <NavLink to="/login/" >Login</NavLink>
          </Box>
          <Box px={4}>
            <NavLink to="/register/" >Sign Up</NavLink>
          </Box>
          </Show>
          <Text><ColorThemeSwitch /></Text>
          <Show below='lg'>
            Hamberger
          </Show>
        </HStack>
    </HStack>
  )
}

export default NavBar
