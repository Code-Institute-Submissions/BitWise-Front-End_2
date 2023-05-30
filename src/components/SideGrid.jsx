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
import useProfiles from "../hooks/useProfiles";
import { SlMagnifier } from "react-icons/sl";
import { BiUserPlus, BiUserMinus } from "react-icons/bi";
import { useColorModeValue } from "@chakra-ui/react";
import LoggedIn from "./LoggedIn";
import { Link } from "react-router-dom";

const SideGrid = () => {
  const [searchProfile, setSearchProfile] = useState("");
  const custColor = useColorModeValue("#805AD5", "#D6BCFA");
  const iconCustColor = useColorModeValue("white", "black");

  const placeholder = searchProfile ? searchProfile : "Search profiles ...";
  const { profiles, setProfiles, loaded } = useProfiles(
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

      {profiles.results.slice(0, 10).map((profile) => (
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
            <Button onClick={() => {}} bg={custColor}>
              <BiUserMinus color={iconCustColor} fontSize="100%" />
            </Button>
          ) : (
            <Button onClick={() => {}}>
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
