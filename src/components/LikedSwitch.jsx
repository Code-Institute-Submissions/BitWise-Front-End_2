import React from "react";
import { Switch, Box, FormControl, FormLabel, Flex } from "@chakra-ui/react";
import {
  useLikedByOwnerFilter,
  useSetLikedByOwnerFilter,
} from "../contexts/FilterContext";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useMediaQuery } from "react-responsive";

const LikedSwitch = () => {
  const likedByUserSwitch = useLikedByOwnerFilter();
  const setLikedByUserSwitch = useSetLikedByOwnerFilter();
  const currentUser = useCurrentUser();

  const handleSwitchChange = (event) => {
    const value = event.target.checked ? currentUser.profile_id : "";
    setLikedByUserSwitch(value);
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  return (
    <Box px={5} pt={isSmallScreen ? 5 : 0}>
      <Flex alignItems="center">
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <FormControl>
            <Flex alignItems="center">
              <FormLabel htmlFor="liked-by-user" mb="0" mr={2}>
                {likedByUserSwitch ? "You Liked" : "All"}
              </FormLabel>
              <Switch
                colorScheme="purple"
                onChange={handleSwitchChange}
                isChecked={likedByUserSwitch === currentUser?.profile_id}
              />
            </Flex>
          </FormControl>
        </form>
      </Flex>
    </Box>
  );
};

export default LikedSwitch;
