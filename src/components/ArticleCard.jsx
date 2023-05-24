import React from "react";
import { Card, CardFooter, CardBody, CardHeader } from "@chakra-ui/react";
import ArticleCardHeader from "./ArticleCardHeader";
import ArticleCardBody from "./ArticleCardBody";
import ArticleCardFooter from "./ArticleCardFooter";
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
    articlePage,
    likes_count,
    comments_count,
    setArticles,
  } = props;

  const currentUser = useCurrentUser();

  return (
    <Card>
      <CardHeader>
        <ArticleCardHeader
          is_owner={is_owner}
          owner={owner}
          created_at={created_at}
          updated_at={updated_at}
          profile_image={profile_image}
        />
      </CardHeader>
      <CardBody>
        <ArticleCardBody
          article_content={article_content}
          primary_language={primary_language}
          articlePage={articlePage}
          article_title={article_title}
          github_link={github_link}
        />
      </CardBody>
      <CardFooter justify="space-between" flexWrap="wrap">
        <ArticleCardFooter
          is_owner={is_owner}
          id={id}
          like_id={like_id}
          likes_count={likes_count}
          comments_count={comments_count}
          setArticles={setArticles}
          currentUser={currentUser}
        />
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
