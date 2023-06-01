import React from "react";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import {
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import ProfileCard from "../../components/ProfileCard";
import ProfileArticles from "../../components/ProfileArticles";
import CardSkeleton from "../../components/CardSkeleton";

const ProfilePage = () => {
  const { id } = useParams();
  const { pageProfile, error, loaded } = useProfile(id);
  const profile = pageProfile.results[0];

  return (
    <Box p={5}>
      {loaded ? <ProfileCard {...profile} /> : <CardSkeleton height={230} />}
      <Tabs variant="enclosed" colorScheme="purple" pt={5}>
        <TabList>
          <Tab>Articles</Tab>
          <Tab>Languages</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ProfileArticles id={id} />
          </TabPanel>
          <TabPanel>
            <Text>Enter Language Component</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProfilePage;
