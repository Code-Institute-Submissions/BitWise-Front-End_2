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
import { BiUserPlus, BiUserMinus, BiUserCheck } from "react-icons/bi";
import { useColorModeValue } from "@chakra-ui/react";
import LoggedIn from "./LoggedIn";
import { Link } from "react-router-dom";
import useFollowProfile from "../hooks/useFollowProfile";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const SideGrid = () => {
  const [searchProfile, setSearchProfile] = useState("");
  const custColor = useColorModeValue("#805AD5", "#D6BCFA");
  const iconCustColor = useColorModeValue("white", "black");
  const currentUser = useCurrentUser();

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

      {!loaded && <Spinner />}

      {sideBarProfiles.results.slice(0, 4).map((profile) => (
        <Flex
          pt={3}
          key={profile.id}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            {profile.profile_name.length > 8 ? (
              <Text>{profile.profile_name.slice(0, 12)}...</Text>
            ) : (
              <Text>{profile.profile_name}</Text>
            )}
          </Box>

          {profile.id === currentUser?.profile_id ? (
            <Popover placement="top">
              <PopoverTrigger>
                <Button border="1px solid" borderColor={custColor}>
                  <BiUserCheck color={custColor} fontSize="100%" />
                </Button>
              </PopoverTrigger>
              <PopoverContent w="220px" marginLeft="-170px">
                <PopoverCloseButton />
                <PopoverHeader>Sorry...</PopoverHeader>
                <PopoverBody>Can't follow self</PopoverBody>
              </PopoverContent>
            </Popover>
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
