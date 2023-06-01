import { useSetProfileData } from "../contexts/ProfilesDataContext";
import { axiosRes } from "../api/axiosDefaults";
import { followAddUpdate, followDeleteUpdate } from "../services/followUpdate";
import {
  useSetArticleFollow,
  useArticleFollow,
} from "../contexts/ArticleFollowUpdate";

const useFollowProfile = () => {
  const setProfileData = useSetProfileData();

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
    } catch (err) {
      console.log(err);
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
    } catch (err) {
      console.log(err);
    }
  };

  return { handleFollow, handleUnFollow };
};

export default useFollowProfile;
