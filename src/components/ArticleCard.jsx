import React from "react";
import { Link } from "react-router-dom";
import languageOptions from "../constants/languageOptions";
import { axiosRes } from "../api/axiosDefaults";
import ArticleUpdateButton from "../components/CardUpdateButton";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import {
  Card,
  CardHeader,
  Flex,
  Heading,
  Text,
  Avatar,
  Box,
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
import { BiLike, BiChat, BiUserPlus } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { useState, useEffect } from "react";

import useLikeArticle from "../hooks/useLikeArticle";

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
    articlePage,
    likes_count,
    comments_count,
    setArticles,
  } = props;

  const custColor = useColorModeValue("#805AD5", "#D6BCFA");

  const currentUser = useCurrentUser();
  const [truncatedContent, setTruncatedContent] = useState("");

  const truncateContent = (content) => {
    const words = content.split(" ");
    if (words.length > 5) {
      const truncatedWords = words.slice(0, 25);
      return truncatedWords.join(" ") + "...";
    }
    return content;
  };

  useEffect(() => {
    if (!articlePage) {
      const truncatedContent = truncateContent(article_content);
      setTruncatedContent(truncatedContent);
    }
  }, [articlePage, article_content]);

  const { handleLike, handleUnlike } = useLikeArticle(
    id,
    like_id,
    likes_count,
    setArticles
  );

  return (
    <Card>
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

          {is_owner && <ArticleUpdateButton />}
        </Flex>
      </CardHeader>

      <CardBody pt={0}>
        <Heading mb={5} size="lg">
          {article_title}
        </Heading>

        {primary_language && (
          <HStack pb={4}>
            {languageOptions.map((language) => {
              if (language.value === primary_language) {
                const IconComponent = language.icon;
                return (
                  <React.Fragment key={language.value}>
                    <IconComponent fontSize={"20"} />
                    <Heading size="sm">
                      {language.value === "CPlusPlus"
                        ? "C++"
                        : language.value === "CSharp"
                        ? "C#"
                        : language.value}
                    </Heading>
                  </React.Fragment>
                );
              }
              return null;
            })}
            {!languageOptions.some(
              (language) => language.value === primary_language
            ) && <Heading size="sm">No Language Recorded</Heading>}
          </HStack>
        )}

        <Box maxW="lg" whiteSpace="pre-line">
          <Text>{articlePage ? article_content : truncatedContent}</Text>
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
