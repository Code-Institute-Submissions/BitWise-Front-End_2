import { useSetProfileData } from "../contexts/ProfilesDataContext";
import { axiosRes } from "../api/axiosDefaults";
import { followAddUpdate, followDeleteUpdate } from "../services/followUpdate";
import {
  useSetArticleFollow,
  useArticleFollow,
} from "../contexts/ArticleFollowUpdate";
import { useSetSuccessToast, useSetFailToast } from "../contexts/AlertToasts";

const useFollowProfile = () => {
  const setProfileData = useSetProfileData();
  const setSuccessToast = useSetSuccessToast();
  const setFailToast = useSetFailToast();

  const setArticleFollow = useSetArticleFollow();
  const articleFollow = useArticleFollow();

  const handleFollow = async (selectedProfile) => {
    try {
      const { data } = await axiosRes.post("/followers/", {
        followed: selectedProfile.id,
      });

      setArticleFollow(!articleFollow);

      setProfileData((prevState) => ({
        ...prevState,

        searchPageProfiles: {
          ...prevState.searchPageProfiles,
          results: prevState.searchPageProfiles.results.map((profile) =>
            followAddUpdate(profile, selectedProfile, data.id)
          ),
        },

        sideBarProfiles: {
          ...prevState.sideBarProfiles,
          results: prevState.sideBarProfiles.results.map((profile) =>
            followAddUpdate(profile, selectedProfile, data.id)
          ),
        },

        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followAddUpdate(profile, selectedProfile, data.id)
          ),
        },
      }));
      setSuccessToast(`You are now following ${selectedProfile.owner}`);
    } catch (err) {
      setFailToast(
        `Unable to follow this profile (status: ${err.response?.status})`
      );
    }
  };

  const handleUnFollow = async (selectedProfile) => {
    try {
      await axiosRes.delete(`/followers/${selectedProfile.following_id}/`);

      setArticleFollow(!articleFollow);

      setProfileData((prevState) => ({
        ...prevState,

        searchPageProfiles: {
          ...prevState.searchPageProfiles,
          results: prevState.searchPageProfiles.results.map((profile) =>
            followDeleteUpdate(profile, selectedProfile)
          ),
        },

        sideBarProfiles: {
          ...prevState.sideBarProfiles,
          results: prevState.sideBarProfiles.results.map((profile) =>
            followDeleteUpdate(profile, selectedProfile)
          ),
        },

        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            followDeleteUpdate(profile, selectedProfile)
          ),
        },
      }));
      setSuccessToast(`You are no longer following ${selectedProfile.owner}`);
    } catch (err) {
      setFailToast(
        `Unable to unfollow this profile (status: ${err.response?.status})`
      );
    }
  };

  return { handleFollow, handleUnFollow };
};

export default useFollowProfile;
