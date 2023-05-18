import { Box, HStack, Image, Show, Text, } from '@chakra-ui/react'
import logo from '../assets/bitwise_logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ColorThemeSwitch from './ColorThemeSwitch';
import HamburgerMenu from './Hamburger';
import handleSignOut from '../services/logout';

import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const loggedInLinks = (
    <>
      <Box px={4}>
        <NavLink to="/feed/" >Feed</NavLink>
      </Box>

      <Box px={4}>
      <Link
        onClick={() => {
          handleSignOut(setCurrentUser, navigate)}
        }>Logout
      </Link>
      </Box>
    </>
  )

  const loggedOutLinks = (
    <>
      <Box px={4}>
        <NavLink to="/register/" >Sign Up</NavLink>
      </Box>

      <Box px={4}>
        <NavLink to="/login/" >Login</NavLink>
      </Box>
    </>
  )

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

          {currentUser ? loggedInLinks : loggedOutLinks}

          </Show>
          <ColorThemeSwitch />
          <Show below='lg'>
            <HamburgerMenu />
          </Show>
        </HStack>
    </HStack>
  )
}

export default NavBar
