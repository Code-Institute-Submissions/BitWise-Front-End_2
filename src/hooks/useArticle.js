import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { CanceledError } from "axios";

const useArticle = (endpoint) => {
  const [article, setArticle] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getArticle = async () => {
      try {
        const [{ data: article }] = await Promise.all([
          axiosReq.get(endpoint, {
            signal: controller.signal,
          }),
        ]);
        setArticle({ results: [article] });
        setLoaded(true);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoaded(true);
      }
    };

    setLoaded(false);
    getArticle();

    return () => controller.abort();
  }, []);

  return { article, setArticle, error, loaded };
};

export default useArticle;
