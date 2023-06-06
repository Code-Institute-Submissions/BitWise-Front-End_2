import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { CanceledError } from "axios";

const useLanguages = (endpoint) => {
  const [languages, setLanguages] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getLanguages = async () => {
      try {
        const { data } = await axiosReq.get(endpoint, {
          signal: controller.signal,
        });
        setLanguages(data);
        setLoaded(true);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoaded(true);
      }
    };

    setLoaded(false);
    getLanguages();

    return () => controller.abort();
  }, [endpoint]);

  return { languages, setLanguages, error, loaded };
};

export default useLanguages;
