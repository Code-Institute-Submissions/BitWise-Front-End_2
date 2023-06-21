import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Stack,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
} from "@chakra-ui/react";

import ArticleCard from "../../components/ArticleCard";

import { Link, useParams } from "react-router-dom";
import CommentCreate from "../../components/CommentCreate";
import CardSkeleton from "../../components/CardSkeleton";
import useArticle from "../../hooks/useArticle";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../../components/Comment";
import { useColorModeValue } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import ItemNotFound from "../../components/ItemNotFound";
import ArticleLinkCard from "../../components/ArticleLinkCard";
import NoResults from "../../components/NoResults";
import ArticleLinkCreate from "../../components/ArticleLinkCreate";

const ArticlePage = () => {
  const { id } = useParams();

  const {
    article,
    setArticle,
    comments,
    setComments,
    links,
    setLinks,
    error,
    loaded,
  } = useArticle(
    `/articles/${id}`,
    `/comments/?article=${id}`,
    `/links/?article=${id}`
  );

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const profile_id = currentUser?.profile_id;
  const custLinkColor = useColorModeValue("#805AD5", "#D6BCFA");
  const is_owner = article.results[0]?.is_owner;
  const [addLink, setAddLink] = useState(false);

  return (
    <Box pb={20}>
      {loaded ? (
        article.results.length ? (
          <Flex p={8} align={"center"} justify={"center"}>
            <Box w={{ base: "100%", md: "600px" }}>
              <ArticleCard
                {...article.results[0]}
                setArticles={setArticle}
                articlePage
              />
            </Box>
          </Flex>
        ) : (
          <Box m={10}>
            <ItemNotFound item={"Article"} />
          </Box>
        )
      ) : (
        <Flex p={8} align={"center"} justify={"center"}>
          <Box w={{ base: "100%", md: "600px" }}>
            <CardSkeleton height={300} />
          </Box>
        </Flex>
      )}

      {loaded && article.results.length > 0 && (
        <Tabs variant="enclosed" colorScheme="purple" pt={5}>
          <TabList>
            <Tab>Comments</Tab>
            <Tab>Article Links</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
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

                  {comments.results.length ? (
                    <InfiniteScroll
                      dataLength={comments.results.length}
                      loader={<Spinner />}
                      hasMore={!!comments.next}
                      next={() => fetchMoreData(comments, setComments)}
                    >
                      {comments.results.map((comment) => (
                        <Comment
                          key={comment.id}
                          {...comment}
                          setArticle={setArticle}
                          setComments={setComments}
                        />
                      ))}
                    </InfiniteScroll>
                  ) : null}
                </Stack>
              </Flex>
            </TabPanel>
            <TabPanel>
              <Flex align={"center"} justify={"center"}>
                <Stack px={10} w="100%">
                  <Flex alignItems={"center"} justifyContent={"center"}>
                    <Heading pb={5} size="lg">
                      Links
                    </Heading>
                  </Flex>

                  {is_owner && (
                    <Button
                      w={155}
                      colorScheme={addLink ? "gray" : "purple"}
                      mb={5}
                      onClick={() => setAddLink(!addLink)}
                    >
                      {addLink ? "Close" : "Add Link"}
                    </Button>
                  )}

                  {addLink && (
                    <ArticleLinkCreate
                      setAddLink={setAddLink}
                      article={article}
                      setLinks={setLinks}
                    />
                  )}
                  <Box pt={10} pb={5}>
                    {links.results.length ? (
                      <Heading size="md">
                        Links Related to this article:
                      </Heading>
                    ) : (
                      <NoResults text={"No Links For Article!"} />
                    )}
                  </Box>

                  {links.results.length
                    ? links.results.map((link) => (
                        <ArticleLinkCard
                          key={link.id}
                          {...link}
                          setLinks={setLinks}
                        />
                      ))
                    : null}
                </Stack>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
};

export default ArticlePage;
