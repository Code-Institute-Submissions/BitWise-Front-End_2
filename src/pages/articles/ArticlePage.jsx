import { Box, Flex, Heading, Text, Stack } from "@chakra-ui/react";

import ArticleCard from "../../components/ArticleCard";

import { Link, useParams } from "react-router-dom";
import CommentCreate from "../../components/CommentCreate";
import ArticleCardSkeleton from "../../components/ArticleCardSkeleton";
import useArticle from "../../hooks/useArticle";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../../components/Comment";
import { useColorModeValue } from "@chakra-ui/react";

const ArticlePage = () => {
  const { id } = useParams();
  const { article, setArticle, comments, setComments, error, loaded } =
    useArticle(`/articles/${id}`, `/comments/?article=${id}`);

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const profile_id = currentUser?.profile_id;
  const custLinkColor = useColorModeValue("#805AD5", "#D6BCFA");

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
      <Flex align={"center"} justify={"center"}>
        <Stack px={10} w="100%">
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Heading pb={5} size="lg">
              Comments
            </Heading>
          </Flex>

          <Flex pb={5} alignItems={"center"} justifyContent={"center"}>
            {currentUser ? (
              comments.results.length ? (
                <Heading size="md">Join the conversation!</Heading>
              ) : (
                <Heading size="md">Be the first to comment!</Heading>
              )
            ) : (
              <Link to="/login/">
                <Heading as="u" color={custLinkColor} size="md">
                  Login to comment!
                </Heading>
              </Link>
            )}
          </Flex>

          {currentUser && (
            <CommentCreate
              profile_id={profile_id}
              profile_image={profile_image}
              article={id}
              setArticle={setArticle}
              setComments={setComments}
              currentUser={currentUser}
            />
          )}

          {comments.results.length
            ? comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setArticle={setArticle}
                  setComments={setComments}
                />
              ))
            : null}
        </Stack>
      </Flex>
    </>
  );
};

export default ArticlePage;
