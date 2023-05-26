import React from "react";
import { Box, Card, Text, Avatar, Flex, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";
import { BiMessageEdit } from "react-icons/bi";
import UpdateDeleteButton from "./UpdateDeleteButton";
import { axiosRes } from "../api/axiosDefaults";

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

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setArticle((prevArticle) => ({
        results: [
          {
            ...prevArticle.results[0],
            comments_count: prevArticle.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      console.log(err);
    }
  };

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
                handleEdit={() => {}}
                handleDelete={handleDelete}
              />
            )}
          </HStack>
        </Flex>
        <Text p={5}>{body}</Text>
      </Card>
      <Box p="1" /> {/*margin on card not working, not sure why*/}
    </>
  );
};

export default Comment;
