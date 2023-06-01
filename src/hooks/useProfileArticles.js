import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { CanceledError } from "axios";
import { useArticleFollow } from "../contexts/ArticleFollowUpdate";

const useProfileArticles = (id) => {
  const [profileArticles, setProfileArticles] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const articleFollow = useArticleFollow();

  useEffect(() => {
    const controller = new AbortController();
    const getProfileArticles = async () => {
      try {
        const { data: profileArticles } = await axiosReq.get(
          `/articles/?owner__profile=${id}`,
          {
            signal: controller.signal,
          }
        );
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
  }, [id, articleFollow]);

  return { profileArticles, setProfileArticles, loaded, error };
};

export default useProfileArticles;
