import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { CanceledError } from "axios";

const useArticle = (endpoint1, endpoint2) => {
  const [article, setArticle] = useState({ results: [] });
  const [comments, setComments] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const getArticle = async () => {
      try {
        const [{ data: article }, { data: comments }] = await Promise.all([
          axiosReq.get(endpoint1, {
            signal: controller.signal,
          }),
          axiosReq.get(endpoint2, {
            signal: controller.signal,
          }),
        ]);
        setArticle({ results: [article] });
        setComments(comments);
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

  return { article, setArticle, comments, setComments, error, loaded };
};

export default useArticle;
