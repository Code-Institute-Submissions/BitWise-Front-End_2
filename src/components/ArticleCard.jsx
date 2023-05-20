import React from "react";
import {
  Card,
  CardHeader,
  Flex,
  Heading,
  Text,
  Avatar,
  Box,
  IconButton,
  CardBody,
  CardFooter,
  Button,
  Show,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiUserPlus } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { SiPython } from "react-icons/si";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { axiosRes } from "../api/axiosDefaults";

const ArticleCard = (props) => {
  const {
    is_owner,
    id,
    owner,
    created_at,
    updated_at,
    article_title,
    article_content,
    github_link,
    like_id,
    primary_language,
    profile_image,
    profile_id,
    articlePage,
    likes_count,
    comments_count,
    setArticles,
  } = props;

  const currentUser = useCurrentUser();

  const custColor = useColorModeValue("#805AD5", "#D6BCFA");

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("likes/", { article: id });
      setArticles((prevArticles) => ({
        ...prevArticles,
        results: prevArticles.results.map((article) => {
          return article.id === id
            ? {
                ...article,
                likes_count: article.likes_count + 1,
                like_id: data.id,
              }
            : article;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async () => {
    try {
      await axiosRes.delete(`likes/${like_id}`);
      setArticles((prevArticles) => ({
        ...prevArticles,
        results: prevArticles.results.map((article) => {
          return article.id === id
            ? {
                ...article,
                likes_count: article.likes_count - 1,
                like_id: null,
              }
            : article;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card maxW="lg">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Link to={`/profiles/`}>
              <Avatar name={owner} bg={"purple.500"} src={profile_image} />
            </Link>
            <Box>
              <Heading size="sm">{owner}</Heading>
              <Text>
                {created_at}
                {updated_at && `(Updated: ${updated_at})`}
              </Text>
            </Box>
          </Flex>

          {is_owner && (
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            />
          )}
        </Flex>
      </CardHeader>

      <CardBody pt={0}>
        <Heading mb={5} size="lg">
          {article_title}
        </Heading>

        {primary_language && (
          <HStack pb={4}>
            <SiPython fontSize={"20"} />
            <Heading size="sm">
              {primary_language || "No Language Recorded"}
            </Heading>
          </HStack>
        )}

        <Box maxW="lg" whiteSpace="pre-line">
          <Text>{article_content}</Text>
        </Box>

        {github_link && (
          <Box>
            <Heading mt={5} size="sm">
              GitHub Link:
            </Heading>
            <a href={github_link} target="_blank">
              <Text color={custColor} as="u">
                {github_link}
              </Text>
            </a>
          </Box>
        )}
      </CardBody>

      <CardFooter justify="space-between" flexWrap="wrap">
        {is_owner ? (
          <Popover placement="top">
            <PopoverTrigger>
              <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                <Show above="sm">Likes </Show>
                {likes_count}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverHeader>Sorry...</PopoverHeader>
              <PopoverBody>You can't like your own post!</PopoverBody>
            </PopoverContent>
          </Popover>
        ) : like_id ? (
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<AiFillLike color={custColor} />}
            onClick={handleUnlike}
          >
            <Show above="sm">Likes </Show>
            {likes_count}
          </Button>
        ) : currentUser ? (
          <Button
            flex="1"
            variant="ghost"
            leftIcon={<BiLike />}
            onClick={handleLike}
          >
            <Show above="sm">Likes </Show>
            {likes_count}
          </Button>
        ) : (
          <Popover placement="top">
            <PopoverTrigger>
              <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                <Show above="sm">Likes </Show>
                {likes_count}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverCloseButton />
              <PopoverHeader>Sorry...</PopoverHeader>
              <PopoverBody>You must be logged in to like posts!</PopoverBody>
            </PopoverContent>
          </Popover>
        )}

        <Link to={`/article/${id}`}>
          <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
            <Show above="sm">Comments </Show>
            {comments_count}
          </Button>
        </Link>

        <Button flex="1" variant="ghost" leftIcon={<BiUserPlus />}>
          <Show above="sm">Follow</Show>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
