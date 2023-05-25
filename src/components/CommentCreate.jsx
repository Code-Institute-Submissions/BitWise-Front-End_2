import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Textarea,
  Avatar,
  HStack,
  Text,
  Stack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

const CommentCreate = (props) => {
  const { id, owner, profile_image } = props;

  const custColor = useColorModeValue("#FAF5FF", "#4A5568");
  const currentUser = useCurrentUser();

  return (
    <Box w="100%">
      <form>
        <FormControl>
          <FormLabel>
            <Heading size="md">Comment:</Heading>
          </FormLabel>
          <HStack
            alignItems="flex-start"
            borderRadius={"15"}
            p={2}
            bg={custColor}
          >
            <Link to={`/profiles/`}>
              <Avatar
                m={2}
                name={owner}
                bg={"purple.500"}
                src={profile_image}
              />
            </Link>

            <Stack pr={3} pb={3} w="100%">
              <Text>{currentUser?.username}</Text>
              <Box w="100%">
                <Textarea bg={custColor} placeholder="Enter comment here..." />
              </Box>
            </Stack>
          </HStack>
        </FormControl>
      </form>
    </Box>
  );
};

export default CommentCreate;
