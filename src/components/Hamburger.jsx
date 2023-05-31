import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { NavLink, Link } from "react-router-dom";

import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import handleSignOut from "../services/logout";

import { useColorModeValue } from "@chakra-ui/react";

const HamburgerMenu = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const navigate = useNavigate();

  const custFontColor = useColorModeValue("black", "white");
  const custBgColor = useColorModeValue("#F7FAFC", "#B794F4");

  const loggedInLinks = (
    <>
      <NavLink to="/feed/">
        <MenuItem>Feed</MenuItem>
      </NavLink>
      <Link
        onClick={() => {
          handleSignOut(setCurrentUser, navigate);
        }}
      >
        <MenuItem>Logout</MenuItem>
      </Link>
    </>
  );

  const loggedOutLinks = (
    <>
      <NavLink to="/register/">
        <MenuItem>Sign Up</MenuItem>
      </NavLink>
      <NavLink to="/login/">
        <MenuItem>Login</MenuItem>
      </NavLink>
    </>
  );

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            color={custFontColor}
            bg={custBgColor}
            isActive={isOpen}
            as={Button}
            fontSize="1.7rem"
            h="50px"
          >
            {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </MenuButton>
          <MenuList color={custFontColor} w="100vw" mt="2" className="nav">
            <NavLink to="/">
              <MenuItem>Home</MenuItem>
            </NavLink>
            <NavLink to="/profiles/">
              <MenuItem>Profiles</MenuItem>
            </NavLink>
            {currentUser ? loggedInLinks : loggedOutLinks}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default HamburgerMenu;
