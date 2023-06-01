import React from "react";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import { Box, Text, Spinner } from "@chakra-ui/react";
import ProfileCard from "../../components/ProfileCard";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ArticleGrid from "../../components/ArticleGrid";

const ProfilePage = () => {
  const { id } = useParams();
  const {
    pageProfile,
    setProfileData,
    profileArticles,
    setProfileArticles,
    error,
    loaded,
  } = useProfile(id);
  const profile = pageProfile.results[0];

  return (
    <Box p={5}>
      {loaded ? (
        <ProfileCard {...profile} setProfileData={setProfileData} />
      ) : (
        <Spinner />
      )}
      <Tabs variant="enclosed" colorScheme="purple" pt={5}>
        <TabList>
          <Tab>Articles</Tab>
          <Tab>Languages</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <ArticleGrid
              articles={profileArticles}
              setArticles={setProfileArticles}
              loaded={loaded}
              message={"Articles not found for this profile."}
            />
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
