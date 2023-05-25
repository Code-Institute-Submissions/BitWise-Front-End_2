import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import ArticleCard from "../../components/ArticleCard";

import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import CommentCreate from "../../components/CommentCreate";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: article }] = await Promise.all([
          axiosReq.get(`/articles/${id}`),
        ]);
        setArticle({ results: [article] });
        setLoaded(true);
        console.log(article);
      } catch (err) {
        setError(err.message);
        setLoaded(true);
      }
    };

    setLoaded(false);
    handleMount();
  }, []);

  return (
    <>
      {loaded ? (
        article ? (
          <Flex p={8} align={"center"} justify={"center"}>
            <ArticleCard
              {...article.results[0]}
              setArticles={setArticle}
              articlePage
            />
          </Flex>
        ) : (
          <Text>{"No Article Found"}</Text>
        )
      ) : (
        <Flex p={8} align={"center"} justify={"center"}>
          <Box w={{ base: "100%", md: "500px" }}>
            <ArticleCardSkeleton />
          </Box>
        </Flex>
      )}

      <Flex p={8} align={"center"} justify={"center"}>
        <CommentCreate />
      </Flex>
    </>
  );
};

export default ArticlePage;
