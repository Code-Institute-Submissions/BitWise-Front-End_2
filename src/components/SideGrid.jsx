import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import useSideProfiles from "../hooks/useSideProfiles";
import { SlMagnifier } from "react-icons/sl";
import { BiUserPlus, BiUserMinus } from "react-icons/bi";
import { useColorModeValue } from "@chakra-ui/react";
import LoggedIn from "./LoggedIn";
import useFollowProfile from "../hooks/useFollowProfile";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import NoResults from "./NoResults";
import { useNavigate } from "react-router-dom";
import UpdateDeleteButton from "./UpdateDeleteButton";

const SideGrid = () => {
  const [searchProfile, setSearchProfile] = useState("");
  const custColor = useColorModeValue("#805AD5", "#D6BCFA");
  const iconCustColor = useColorModeValue("white", "black");
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const { handleFollow, handleUnFollow } = useFollowProfile();

  const placeholder = searchProfile ? searchProfile : "Search profiles ...";
  const { sideBarProfiles, loaded } = useSideProfiles(
    `/profiles/?ordering=-followed_count&search=${searchProfile}`
  );

  const handleEdit = (profileId) => {
    navigate(`/profile/edit/${profileId}/`);
  };

  const handlePasswordUpdate = (profileId) => {
    navigate(`/profile/password/${profileId}/`);
  };

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
                aria-label="Search profiles"
              />
            </InputGroup>
          </FormControl>
        </form>
      </Box>

      <Heading mt={10} mb={3} size="sm">
        Popular Profiles:
      </Heading>

      {loaded ? (
        sideBarProfiles.results.length ? (
          <>
            {sideBarProfiles.results.slice(0, 10).map((profile) => (
              <Flex
                pt={3}
                key={profile.id}
                alignItems="center"
                justifyContent="space-between"
              >
                <Link to={`/profile/${profile.id}`}>
                  <Box>
                    {profile.owner.length > 8 ? (
                      <Text>{profile.owner.slice(0, 12)}...</Text>
                    ) : (
                      <Text>{profile.owner}</Text>
                    )}
                  </Box>
                </Link>

                {profile.id === currentUser?.profile_id ? (
                  <UpdateDeleteButton
                    icon={<BsThreeDotsVertical />}
                    target={"Profile"}
                    handleEdit={() => handleEdit(profile.id)}
                    handlePasswordUpdate={() =>
                      handlePasswordUpdate(profile.id)
                    }
                    profileUpdate
                  />
                ) : profile.following_id ? (
                  <Button
                    onClick={() => handleUnFollow(profile)}
                    bg={custColor}
                    aria-label="Unfollow"
                  >
                    <BiUserMinus color={iconCustColor} fontSize="100%" />
                  </Button>
                ) : currentUser ? (
                  <Button
                    onClick={() => handleFollow(profile)}
                    aria-label="Follow"
                  >
                    <BiUserPlus fontSize="100%" />
                  </Button>
                ) : (
                  <Popover placement="top">
                    <PopoverTrigger>
                      <Button aria-label="Follow">
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
            {sideBarProfiles.results.length > 10 && (
              <Box pt={10}>
                <Link to="/profiles/">
                  <Heading as="u" color={custColor} size="sm">
                    View More...
                  </Heading>
                </Link>
              </Box>
            )}
          </>
        ) : (
          <NoResults text={"No Profiles Found!"} />
        )
      ) : (
        <Flex py={2}>
          <Text pr={2}>Updating...</Text>
          <Spinner />
        </Flex>
      )}
    </>
  );
};

export default SideGrid;
