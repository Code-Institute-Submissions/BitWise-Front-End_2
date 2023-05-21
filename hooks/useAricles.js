import { useState, useEffect } from "react";
import { axiosReq } from "../src/api/axiosDefaults";

const useArticles = (endpoint) => {
  const [articles, setArticles] = useState({ results: [] });
  const [filter, setFilter] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getArticles = async () => {
      try {
        const { data } = await axiosReq.get(endpoint);
        setArticles(data);
        setLoaded(true);
      } catch (err) {
        setError(err.message);
        setLoaded(true);
      }
    };
    getArticles();
    setLoaded(false);
  }, [filter]);

  return { articles, setArticles, error, loaded };
};

export default useArticles;
