import {
  Text,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Button,
  Heading,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useSideProfiles from "../hooks/useSideProfiles";
import { SlMagnifier } from "react-icons/sl";
import { BiUserPlus, BiUserMinus } from "react-icons/bi";
import { useColorModeValue } from "@chakra-ui/react";
import LoggedIn from "./LoggedIn";
import { Link } from "react-router-dom";
import useFollowProfile from "../hooks/useFollowProfile";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

const SideGrid = () => {
  const [searchProfile, setSearchProfile] = useState("");
  const custColor = useColorModeValue("#805AD5", "#D6BCFA");
  const iconCustColor = useColorModeValue("white", "black");
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const { handleFollow, handleUnFollow } = useFollowProfile();

  const placeholder = searchProfile ? searchProfile : "Search profiles ...";
  const { sideBarProfiles, loaded } = useSideProfiles(
    `/profiles/?search=${searchProfile}`
  );

  return (
    <>
      <LoggedIn />
      <Box mt={5}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <FormControl id="searchProfiles">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SlMagnifier />
              </InputLeftElement>
              <Input
                type="text"
                name="user"
                placeholder={placeholder}
                value={searchProfile}
                onChange={(event) => setSearchProfile(event.target.value)}
              />
            </InputGroup>
          </FormControl>
        </form>
      </Box>

      <Heading mt={10} mb={3} size="sm">
        Popular Profiles:
      </Heading>

      {!loaded && (
        <Flex py={2}>
          <Text pr={2}>Updating...</Text>
          <Spinner />
        </Flex>
      )}

      {sideBarProfiles.results.slice(0, 10).map((profile) => (
        <Flex
          pt={3}
          key={profile.id}
          alignItems="center"
          justifyContent="space-between"
        >
          <Link to={`/profile/${profile.id}`}>
            <Box>
              {profile.profile_name.length > 8 ? (
                <Text>{profile.profile_name.slice(0, 12)}...</Text>
              ) : (
                <Text>{profile.profile_name}</Text>
              )}
            </Box>
          </Link>

          {profile.id === currentUser?.profile_id ? (
            <Button
              onClick={() => {
                navigate(`/profile/edit/${profile.id}/`);
              }}
            >
              <BsThreeDotsVertical fontSize="100%" />
            </Button>
          ) : profile.following_id ? (
            <Button onClick={() => handleUnFollow(profile)} bg={custColor}>
              <BiUserMinus color={iconCustColor} fontSize="100%" />
            </Button>
          ) : currentUser ? (
            <Button onClick={() => handleFollow(profile)}>
              <BiUserPlus fontSize="100%" />
            </Button>
          ) : (
            <Popover placement="top">
              <PopoverTrigger>
                <Button>
                  <BiUserPlus fontSize="100%" />
                </Button>
              </PopoverTrigger>
              <PopoverContent w="220px" marginLeft="-170px">
                <PopoverCloseButton />
                <PopoverHeader>Sorry...</PopoverHeader>
                <PopoverBody>Login to follow</PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </Flex>
      ))}
      {loaded && (
        <Box pt={10}>
          <Link to="/profiles/">
            <Heading as="u" color={custColor} size="sm">
              View More...
            </Heading>
          </Link>
        </Box>
      )}
    </>
  );
};

export default SideGrid;
