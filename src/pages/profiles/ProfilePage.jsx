import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import useProfile from "../../hooks/useProfile";
import { useResetFilters } from "../../hooks/useResetFilters";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useSearchFilter,
  useOrderFilter,
  useLanguageFilter,
  useLikedByOwnerFilter,
} from "../../contexts/FilterContext";

import ProfileCard from "../../components/ProfileCard";
import ProfileArticles from "../../components/ProfileArticles";
import CardSkeleton from "../../components/CardSkeleton";
import SearchField from "../../components/SearchField";
import OrderDropdown from "../../components/OrderDropdown";
import LanguageDropdown from "../../components/LanguageDropdown";
import LikedSwitch from "../../components/LikedSwitch";

import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Show,
} from "@chakra-ui/react";
import LanguageList from "../../components/LanguageList";

const ProfilePage = () => {
  const { id } = useParams();
  const { pageProfile, error, loaded } = useProfile(id);
  const profile = pageProfile.results[0];
  const currentUser = useCurrentUser();

  const searchFilter = useSearchFilter();
  const orderFilter = useOrderFilter();
  const languageFilter = useLanguageFilter();
  const likedByOwnerFilter = useLikedByOwnerFilter();
  const endpoint =
    `/articles/?owner__profile=${id}&search=${searchFilter}&ordering=${orderFilter}` +
    `${
      likedByOwnerFilter ? `&likes__owner__profile=${likedByOwnerFilter}` : ""
    }` +
    `&primary_language=${languageFilter}`;

  const endpointLanguages = `/languages/?owner__profile=${id}`;

  const resetFilters = useResetFilters();
  const { pathname } = useLocation();

  useEffect(() => {
    resetFilters();
  }, [pathname]);

  return (
    <Box>
      <Box p={5}>
        {loaded ? (
          <ProfileCard {...profile} main />
        ) : (
          <CardSkeleton height={230} />
        )}
      </Box>
      <Tabs variant="enclosed" colorScheme="purple" p={5}>
        <TabList>
          <Tab>Articles</Tab>
          <Tab>Languages</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SearchField />
            <HStack>
              <OrderDropdown />
              <LanguageDropdown />
              {currentUser && (
                <Show above="md">
                  <LikedSwitch />
                </Show>
              )}
            </HStack>
            {currentUser && (
              <Show below="md">
                <LikedSwitch />
              </Show>
            )}
            <ProfileArticles endpoint={endpoint} />
          </TabPanel>
          <TabPanel>
            <LanguageList profile={profile} endpoint={endpointLanguages} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfilePage;
