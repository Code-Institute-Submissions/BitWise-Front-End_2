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
} from "@chakra-ui/react";
import React, { useState } from "react";
import useSideProfiles from "../hooks/useProfiles";
import { SlMagnifier } from "react-icons/sl";
import { BiUserPlus, BiUserMinus } from "react-icons/bi";
import { useColorModeValue } from "@chakra-ui/react";
import LoggedIn from "./LoggedIn";
import { Link } from "react-router-dom";
import useFollowProfile from "../hooks/useFollowProfile";

const SideGrid = () => {
  const [searchProfile, setSearchProfile] = useState("");
  const custColor = useColorModeValue("#805AD5", "#D6BCFA");
  const iconCustColor = useColorModeValue("white", "black");

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

      {sideBarProfiles.results.slice(0, 10).map((profile) => (
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
          {profile.following_id ? (
            <Button onClick={() => handleUnFollow(profile)} bg={custColor}>
              <BiUserMinus color={iconCustColor} fontSize="100%" />
            </Button>
          ) : (
            <Button onClick={() => handleFollow(profile)}>
              <BiUserPlus fontSize="100%" />
            </Button>
          )}
        </Flex>
      ))}
      {loaded && (
        <Box pt={10}>
          <Link>
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
