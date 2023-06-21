import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { CanceledError } from "axios";
import { useArticleFollow } from "../contexts/ArticleFollowUpdate";

const useArticle = (endpoint1, endpoint2, endpoint3) => {
  const [article, setArticle] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const [links, setLinks] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const articleFollow = useArticleFollow();

  useEffect(() => {
    const controller = new AbortController();

    const getArticle = async () => {
      try {
        const [{ data: article }, { data: comments }, { data: links }] =
          await Promise.all([
            axiosReq.get(endpoint1, {
              signal: controller.signal,
            }),
            axiosReq.get(endpoint2, {
              signal: controller.signal,
            }),
            axiosReq.get(endpoint3, {
              signal: controller.signal,
            }),
          ]);
        setArticle({ results: [article] });
        setComments(comments);
        setLinks(links);
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
  }, [articleFollow]);

  return {
    article,
    setArticle,
    comments,
    setComments,
    links,
    setLinks,
    error,
    loaded,
  };
};

export default useArticle;
