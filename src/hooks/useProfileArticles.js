import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { CanceledError } from "axios";
import { useArticleFollow } from "../contexts/ArticleFollowUpdate";

const useProfileArticles = (endpoint) => {
  const [profileArticles, setProfileArticles] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const articleFollow = useArticleFollow();

  useEffect(() => {
    const controller = new AbortController();
    const getProfileArticles = async () => {
      try {
        const { data: profileArticles } = await axiosReq.get(endpoint, {
          signal: controller.signal,
        });
        setProfileArticles(profileArticles);
        setLoaded(true);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoaded(true);
      }
    };

    setLoaded(false);
    getProfileArticles();

    return () => controller.abort();
  }, [endpoint, articleFollow]);

  return { profileArticles, setProfileArticles, loaded, error };
};

export default useProfileArticles;
