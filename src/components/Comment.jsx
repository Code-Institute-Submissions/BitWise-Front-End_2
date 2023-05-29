import React, { useState } from "react";
import { Box, Card, Text, Avatar, Flex, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";
import { BiMessageEdit } from "react-icons/bi";
import UpdateDeleteButton from "./UpdateDeleteButton";
import useCommentDelete from "../hooks/useCommentDelete";
import CommentsEdit from "./CommentEdit";

const Comment = (props) => {
  const {
    is_owner,
    id,
    owner,
    profile_image,
    created_at,
    updated_at,
    updated_at_edited,
    body,
    setArticle,
    setComments,
  } = props;
  const custColor = useColorModeValue("#FAF5FF", "#4A5568");

  const { handleDelete, error } = useCommentDelete(id, setArticle, setComments);

  const [showEditComment, setShowEditComment] = useState(false);

  return (
    <>
      <Card position={"auto"} borderRadius={5} overflow={"hidden"}>
        <Flex p={5} alignItems="center" bg={custColor}>
          <Link to={`/profiles/`}>
            <Avatar name={owner} bg={"purple.500"} src={profile_image} mr={5} />
          </Link>
          <HStack
            w="100%"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box>
              <Text fontWeight="bold">{owner}</Text>
              <Text fontSize="sm">{created_at}</Text>
            </Box>
            {is_owner && (
              <UpdateDeleteButton
                icon={<BiMessageEdit />}
                target={"Comment"}
                handleEdit={() => setShowEditComment(true)}
                handleDelete={handleDelete}
              />
            )}
          </HStack>
        </Flex>
        {showEditComment ? (
          <CommentsEdit
            id={id}
            body={body}
            setShowEditComment={setShowEditComment}
            setComments={setComments}
          />
        ) : (
          <Text p={5}>{body}</Text>
        )}
      </Card>
      <Box p="1" /> {/*margin on card not working, not sure why*/}
    </>
  );
};

export default Comment;
