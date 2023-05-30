import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { CanceledError } from "axios";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const useProfiles = (endpoint) => {
  const [profiles, setProfiles] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const controller = new AbortController();

    const getProfiles = async () => {
      try {
        const { data } = await axiosReq.get(endpoint, {
          signal: controller.signal,
        });
        setProfiles(data);
        setLoaded(true);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoaded(true);
      }
    };

    setLoaded(false);
    getProfiles();

    return () => controller.abort();
  }, [currentUser, endpoint]);

  return { profiles, setProfiles, error, loaded };
};

export default useProfiles;
