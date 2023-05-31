import React, { useState } from "react";
import {
  Text,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import useListProfiles from "../../hooks/useListProfiles";
import { SlMagnifier } from "react-icons/sl";
import InfiniteScroll from "react-infinite-scroll-component";
import ProfileCard from "../../components/ProfileCard";

const ProfilesListPage = () => {
  const [searchProfiles, setSearchProfiles] = useState("");
  const [orderProfiles, setOrderProfiles] = useState("");
  const [restricedProfiles, setRestrictedProfiles] = useState("");

  const { searchPageProfiles, setProfileData, loaded } = useListProfiles(
    `/profiles/?search=${searchProfiles}`
  );

  const placeholder = searchProfiles ? searchProfiles : "Search profiles ...";

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
          <Text>{message}</Text>
        )
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default ProfilesListPage;
