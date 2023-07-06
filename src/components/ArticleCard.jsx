import React from "react";
import { Card, CardFooter, CardBody, CardHeader } from "@chakra-ui/react";
import ArticleCardHeader from "./ArticleCardHeader";
import ArticleCardBody from "./ArticleCardBody";
import ArticleCardFooter from "./ArticleCardFooter";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { useColorModeValue } from "@chakra-ui/react";

const ArticleCard = (props) => {
  const {
    is_owner,
    id,
    owner,
    created_at,
    updated_at,
    article_title,
    article_content,
    like_id,
    primary_language,
    profile_image,
    articlePage,
    likes_count,
    current_user_comments_count,
    comments_count,
    setArticles,
    is_following,
    profile_id,
  } = props;

  const currentUser = useCurrentUser();
  const custColor = useColorModeValue("#FAF5FF", "#4A5568");

  return (
    <Card borderBottom={"2px solid grey"} borderRight={"2px solid grey"}>
      <CardHeader>
        <ArticleCardHeader
          is_owner={is_owner}
          pk={id}
          profile_id={profile_id}
          owner={owner}
          created_at={created_at}
          updated_at={updated_at}
          profile_image={profile_image}
          setArticles={setArticles}
        />
      </CardHeader>
      <CardBody>
        <ArticleCardBody
          id={id}
          article_content={article_content}
          primary_language={primary_language}
          articlePage={articlePage}
          article_title={article_title}
        />
      </CardBody>
      <CardFooter
        borderBottomRadius={10}
        bg={custColor}
        justify="space-between"
        flexWrap="wrap"
      >
        <ArticleCardFooter
          is_owner={is_owner}
          id={id}
          like_id={like_id}
          likes_count={likes_count}
          comments_count={comments_count}
          current_user_comments_count={current_user_comments_count}
          setArticles={setArticles}
          currentUser={currentUser}
          is_following={is_following}
          profile_id={profile_id}
          article_title={article_title}
        />
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
