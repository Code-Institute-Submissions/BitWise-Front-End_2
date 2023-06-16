import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  SimpleGrid,
  Spinner,
  Select,
  HStack,
  Flex,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import useListProfiles from "../../hooks/useListProfiles";
import { SlMagnifier } from "react-icons/sl";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileCard from "../../components/ProfileCard";
import { useMediaQuery } from "@chakra-ui/react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CardSkeleton from "../../components/CardSkeleton";
import NoResults from "../../components/NoResults";

const ProfilesListPage = (props) => {
  const { message } = props;
  const [searchProfiles, setSearchProfiles] = useState("");
  const [orderProfiles, setOrderProfiles] = useState("");
  const [restricedProfiles, setRestrictedProfiles] = useState("");
  const skeletons = [1, 2, 3, 4, 5, 6];

  const { searchPageProfiles, setProfileData, loaded } = useListProfiles(
    `/profiles/?search=${searchProfiles}&ordering=${orderProfiles}&owner__followed__owner__profile=${restricedProfiles}`
  );

  const placeholder = searchProfiles
    ? searchProfiles
    : "Search profile name ...";

  const handleProfilesOrderChange = (event) => {
    setOrderProfiles(event.target.value);
  };

  const handleProfilesRestrictedChange = (event) => {
    const value = event.target.checked ? currentUser.profile_id : "";
    setRestrictedProfiles(value);
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 600 });

  const currentUser = useCurrentUser();

  return (
    <Box p={5}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <FormControl px={5} id="searchProfiles">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SlMagnifier />
            </InputLeftElement>
            <Input
              type="text"
              name="user"
              placeholder={placeholder}
              value={searchProfiles}
              onChange={(event) => setSearchProfiles(event.target.value)}
            />
          </InputGroup>
        </FormControl>
      </form>

      <HStack mx={5} mt={5}>
        <Box w="155">
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <FormControl id="orderProfilesFilter">
              <Select
                placeholder="Date Joined"
                onChange={handleProfilesOrderChange}
                value={orderProfiles}
              >
                <option value="-article_count">
                  {isSmallScreen ? "Articles" : "Most Articles"}
                </option>
                <option value="-followed_count">
                  {isSmallScreen ? "Followers" : "Most Followers"}
                </option>
                <option value="-languages_count">
                  {isSmallScreen ? "Languages" : "Most Languages"}
                </option>
              </Select>
            </FormControl>
          </form>
        </Box>
        {currentUser && (
          <Box>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <FormControl>
                <Flex alignItems="center" flexWrap="wrap" ml={2}>
                  <FormLabel my="0" htmlFor="restrictedProfilesFilter">
                    {restricedProfiles ? "Following" : "All"}
                  </FormLabel>
                  <Switch
                    colorScheme="purple"
                    onChange={handleProfilesRestrictedChange}
                    isChecked={restricedProfiles === currentUser?.profile_id}
                  />
                </Flex>
              </FormControl>
            </form>
          </Box>
        )}
      </HStack>

      {loaded ? (
        searchPageProfiles.results.length ? (
          <InfiniteScroll
            dataLength={searchPageProfiles.results.length}
            loader={<Spinner />}
            hasMore={!!searchPageProfiles.next}
            next={() => fetchMoreData(searchPageProfiles, setProfileData)}
          >
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} p={5} spacing={5}>
              {searchPageProfiles.results.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  {...profile}
                  setProfileData={setProfileData}
                />
              ))}
            </SimpleGrid>
          </InfiniteScroll>
        ) : (
          <Box m={5}>
            <NoResults text={message} />
          </Box>
        )
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} p={5} spacing={5}>
          {skeletons.map((skeleton) => (
            <CardSkeleton height={250} key={skeleton} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ProfilesListPage;
