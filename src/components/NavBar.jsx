import { Box, HStack, Image, Show } from "@chakra-ui/react";
import logo from "../assets/bitwise_logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ColorThemeSwitch from "./ColorThemeSwitch";
import HamburgerMenu from "./Hamburger";
import handleSignOut from "../services/logout";
import { MdPostAdd } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";

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
        <NavLink to="/feed/">Feed</NavLink>
      </Box>

      <Box px={4}>
        <Link
          onClick={() => {
            handleSignOut(setCurrentUser, navigate);
          }}
        >
          Logout
        </Link>
      </Box>
    </>
  );

  const loggedOutLinks = (
    <>
      <Box px={4}>
        <NavLink to="/register/">Sign Up</NavLink>
      </Box>

      <Box px={4}>
        <NavLink to="/login/">Login</NavLink>
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
          <Image src={logo} boxSize="50px" m="5px" />
        </Link>

        {currentUser && (
          <Box px={4}>
            <NavLink to="/article/create/">
              <MdPostAdd fontSize="250%" />
              Add Article
            </NavLink>
          </Box>
        )}
      </HStack>

      <HStack pr={"10px"}>
        <Show above="lg">
          <Box px={4}>
            <NavLink to="/">Home</NavLink>
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
