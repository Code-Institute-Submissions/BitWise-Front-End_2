import React, { useEffect } from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Box, Text } from "@chakra-ui/react";

import ArticleCard from "../components/ArticleCard";
import { useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

import { Spinner } from "@chakra-ui/react";

const HomePage = () => {
  const currentUser = useCurrentUser();

  const [articles, setArticles] = useState({ results: [] });
  const [filter, setFilter] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const { data } = await axiosReq.get(`/articles/?${filter}`);
        setArticles(data);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    getArticles();
    setLoaded(false);
  }, [filter]);

  return (
    <Box>
      {loaded ? (
        articles.results.length ? (
          articles.results.map((article) => (
            <ArticleCard
              key={article.id}
              {...article}
              setArticles={setArticles}
            />
          ))
        ) : (
          <Text>No Results</Text>
        )
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default HomePage;
