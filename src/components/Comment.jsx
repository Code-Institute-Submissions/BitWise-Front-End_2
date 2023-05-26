import React from "react";
import { Box, Card, Text, Avatar, Flex, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";
import { BiMessageEdit } from "react-icons/bi";
import UpdateDeleteButton from "./UpdateDeleteButton";

const Comment = (props) => {
  const { comment } = props;
  const custColor = useColorModeValue("#FAF5FF", "#4A5568");
  return (
    <>
      <Card borderRadius={5} overflow={"hidden"}>
        <Flex p={5} alignItems="center" bg={custColor}>
          <Link to={`/profiles/`}>
            <Avatar
              name={comment.owner}
              bg={"purple.500"}
              src={comment.profile_image}
              mr={5}
            />
          </Link>
          <HStack
            w="100%"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Box>
              <Text fontWeight="bold">{comment.owner}</Text>
              <Text fontSize="sm">{comment.created_at}</Text>
            </Box>
            <UpdateDeleteButton
              icon={<BiMessageEdit />}
              target={"Comment"}
              handleEdit={() => {}}
              handleDelete={() => {}}
            />
          </HStack>
        </Flex>
        <Text p={5}>{comment.body}</Text>
      </Card>
      <Box p="1" /> {/*margin on card not working, not sure why*/}
    </>
  );
};

export default Comment;
