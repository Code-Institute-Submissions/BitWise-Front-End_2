import { Box, Flex, HStack, Show, Text } from "@chakra-ui/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ColorThemeSwitch from "./ColorThemeSwitch";
import HamburgerMenu from "./Hamburger";
import handleSignOut from "../services/logout";
import { MdPostAdd } from "react-icons/md";
import { RiCodeBoxFill } from "react-icons/ri";

import { useColorModeValue } from "@chakra-ui/react";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";

const NavBar = () => {
  const bgColor = useColorModeValue("#805AD5", "#4A5568");

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const loggedInLinks = (
    <>
      <Box px={6}>
        <NavLink to="/feed/" aria-label="Feed">
          Feed
        </NavLink>
      </Box>

      <Box px={4}>
        <Link
          onClick={() => {
            handleSignOut(setCurrentUser, navigate);
          }}
          aria-label="Logout"
        >
          Logout
        </Link>
      </Box>
    </>
  );

  const loggedOutLinks = (
    <>
      <Box px={4}>
        <NavLink to="/register/" aria-label="Sign Up">
          Sign Up
        </NavLink>
      </Box>

      <Box px={4}>
        <NavLink to="/login/" aria-label="Login">
          Login
        </NavLink>
      </Box>
    </>
  );

  return (
    <HStack
      color={"white"}
      bg={bgColor}
      justifyContent="space-between"
      padding="10px"
      className="nav"
    >
      <HStack>
        <Link to="/">
          <Flex alignItems="center">
            <RiCodeBoxFill fontSize="300%" />
            <Show above="sm">
              <Text ml={2} fontWeight={700}>
                BitWise
              </Text>
            </Show>
          </Flex>
        </Link>

        {currentUser && (
          <Box px={4}>
            <NavLink to="/article/create/" aria-label="Add Article">
              <MdPostAdd fontSize="250%" />
              <Show above="sm">Add Article</Show>
            </NavLink>
          </Box>
        )}
      </HStack>

      <HStack pr={"10px"}>
        <Show above="lg">
          <Box px={4}>
            <NavLink to="/" aria-label="Home">
              Home
            </NavLink>
          </Box>
          <Box px={4}>
            <NavLink to="/profiles/" aria-label="Profiles">
              Profiles
            </NavLink>
          </Box>

          {currentUser ? loggedInLinks : loggedOutLinks}
        </Show>
        <ColorThemeSwitch />
        <Show below="lg">
          <HamburgerMenu />
        </Show>
      </HStack>
    </HStack>
  );
};

export default NavBar;
