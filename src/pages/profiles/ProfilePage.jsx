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
import RecommendedList from "../../components/RecommendedList";

import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  HStack,
  Show,
  Hide,
  useBreakpointValue,
} from "@chakra-ui/react";
import LanguageList from "../../components/LanguageList";
import ItemNotFound from "../../components/ItemNotFound";

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

  const fontSize = useBreakpointValue({ base: "xs", sm: "md" });

  useEffect(() => {
    resetFilters();
  }, [pathname]);

  return (
    <Box>
      <Box p={5}>
        {loaded ? (
          profile ? (
            <ProfileCard {...profile} main />
          ) : (
            <ItemNotFound item={"Profile"} />
          )
        ) : (
          <CardSkeleton height={230} />
        )}
      </Box>

      {profile && (
        <Tabs variant="enclosed" colorScheme="purple" pt={5}>
          <TabList>
            <Tab fontSize={fontSize}>Articles</Tab>
            <Tab fontSize={fontSize}>Languages</Tab>
            {currentUser?.profile_id === profile?.id && (
              <Tab fontSize={fontSize}>Recommended</Tab>
            )}
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
                <Hide above="md">
                  <LikedSwitch />
                </Hide>
              )}
              <ProfileArticles endpoint={endpoint} />
            </TabPanel>
            <TabPanel>
              <LanguageList profile={profile} endpoint={endpointLanguages} />
            </TabPanel>

            {currentUser?.profile_id === profile?.id && (
              <TabPanel>
                <RecommendedList {...profile} />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
};

export default ProfilePage;
