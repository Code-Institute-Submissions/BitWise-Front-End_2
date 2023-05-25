import React from "react";
import { Box, Card, Text, Avatar, Flex, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";

const Comment = (props) => {
  const { comment } = props;
  const custColor = useColorModeValue("#FAF5FF", "#4A5568");
  return (
    <>
      <Card>
        <Flex alignItems="center" justifyContent="flex-start" bg={custColor}>
          <Link to={`/profiles/`}>
            <Avatar
              m={5}
              name={comment.owner}
              bg={"purple.500"}
              src={comment.profile_image}
            />
          </Link>
          <Stack>
            <Text fontWeight="bold">{comment.owner}</Text>
            <Text>Commented {comment.created_at}</Text>
          </Stack>
        </Flex>
        <Text p={5}>{comment.body}</Text>
      </Card>
      <Box p="1" /> {/*margin on card not working, not sure why*/}
    </>
  );
};

export default Comment;
