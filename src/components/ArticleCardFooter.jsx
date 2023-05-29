import React from "react";
import { Link } from "react-router-dom";
import { BiLike, BiChat, BiUserPlus } from "react-icons/bi";
import { MdMarkChatRead } from "react-icons/md";
MdMarkChatRead;
import { AiFillLike } from "react-icons/ai";
import {
  Button,
  Show,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import useLikeArticle from "../hooks/useLikeArticle";

const ArticleCardFooter = (props) => {
  const {
    is_owner,
    id,
    like_id,
    likes_count,
    comments_count,
    setArticles,
    currentUser,
    current_user_comments_count,
  } = props;

  const custColor = useColorModeValue("#805AD5", "#D6BCFA");

  const { handleLike, handleUnlike } = useLikeArticle(
    id,
    like_id,
    likes_count,
    setArticles
  );

  return (
    <>
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
        <Button
          flex="1"
          variant="ghost"
          leftIcon={
            current_user_comments_count > 0 ? (
              <MdMarkChatRead color={custColor} />
            ) : (
              <BiChat />
            )
          }
        >
          <Show above="sm">Comments </Show>
          {comments_count}
        </Button>
      </Link>

      <Button flex="1" variant="ghost" leftIcon={<BiUserPlus />}>
        <Show above="sm">Follow</Show>
      </Button>
    </>
  );
};

export default ArticleCardFooter;
