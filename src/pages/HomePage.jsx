import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { Spinner, Box, Text } from "@chakra-ui/react";
import useArticles from "../../hooks/useAricles";

const HomePage = () => {
  const [filter, setFilter] = useState("");
  const { articles, setArticles, error, loaded } = useArticles(
    `/articles/?${filter}`
  );

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
          <Text>{error}</Text>
        )
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

export default HomePage;
