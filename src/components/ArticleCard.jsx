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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiUserPlus } from "react-icons/bi";
import { SiPython } from "react-icons/si";
import { useCurrentUser } from "../contexts/CurrentUserContext";

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
  } = props;

  const currentUser = useCurrentUser();
  const paragraphs = article_content ? article_content.split("\r\n") : [];

  return (
    <Card maxW="lg">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Link to={`/profiles/`}>
              <Avatar name={owner} bg={"purple.500"} src={profile_image} />
            </Link>
            <Box>
              <Heading size="sm">{article_title}</Heading>
              <Text>{owner}</Text>
            </Box>
          </Flex>

          <IconButton
            variant="ghost"
            colorScheme="gray"
            aria-label="See menu"
            icon={<BsThreeDotsVertical />}
          />
        </Flex>
      </CardHeader>

      <CardBody pt={0}>
        {primary_language && (
          <HStack pb={4}>
            <SiPython fontSize={"30"} />
            <Heading>{primary_language || "No Language Recorded"}</Heading>
          </HStack>
        )}

        {paragraphs.map((paragraph, index) => (
          <Text key={index} mb={4}>
            {paragraph}
          </Text>
        ))}
      </CardBody>

      <CardFooter justify="space-between" flexWrap="wrap">
        <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
          <Show above="sm">Like</Show>
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
          <Show above="sm">Comment</Show>
        </Button>
        <Button flex="1" variant="ghost" leftIcon={<BiUserPlus />}>
          <Show above="sm">Follow</Show>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
