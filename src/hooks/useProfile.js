import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { CanceledError } from "axios";
import {
  useProfileData,
  useSetProfileData,
} from "../contexts/ProfilesDataContext";

const useProfile = (id) => {
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profileArticles, setProfileArticles] = useState({ results: [] });

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const getProfile = async () => {
      try {
        const [{ data: pageProfile }, { data: profileArticles }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`, {
              signal: controller.signal,
            }),
            axiosReq.get(`/articles/?owner__profile=${id}`, {
              signal: controller.signal,
            }),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileArticles(profileArticles);
        setLoaded(true);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoaded(true);
      }
    };

    setLoaded(false);
    getProfile();

    return () => controller.abort();
  }, [id, setProfileData]);

  return {
    pageProfile,
    setProfileData,
    profileArticles,
    setProfileArticles,
    error,
    loaded,
  };
};

export default useProfile;
