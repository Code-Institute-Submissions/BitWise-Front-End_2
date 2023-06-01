import React from "react";
import { useParams } from "react-router-dom";
import useProfile from "../../hooks/useProfile";
import { Text, Box, Card } from "@chakra-ui/react";
import ProfileCard from "../../components/ProfileCard";

const ProfilePage = () => {
  const { id } = useParams();
  const { pageProfile, setProfileData, profileArticles, error, loaded } =
    useProfile(id);
  const profile = pageProfile.results[0];

  return (
    <Box p={5}>
      {loaded && <ProfileCard {...profile} setProfileData={setProfileData} />}
    </Box>
  );
};

export default ProfilePage;
