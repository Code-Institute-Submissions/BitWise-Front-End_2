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

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const getProfile = async () => {
      try {
        const { data: pageProfile } = await axiosReq.get(`/profiles/${id}/`, {
          signal: controller.signal,
        });
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
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
    error,
    loaded,
  };
};

export default useProfile;
