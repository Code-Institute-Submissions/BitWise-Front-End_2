import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import ArticleCard from "../../components/ArticleCard";

import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import CommentCreate from "../../components/CommentCreate";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import useArticle from "../../hooks/UseArticle";

const ArticlePage = () => {
  const { id } = useParams();

  const { article, setArticle, error, loaded } = useArticle(`/articles/${id}`);

  return (
    <>
      {loaded ? (
        article.results.length ? (
          <Flex p={8} align={"center"} justify={"center"}>
            <ArticleCard
              {...article.results[0]}
              setArticles={setArticle}
              articlePage
            />
          </Flex>
        ) : (
          <Text>No Results Found</Text>
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
