import React from "react";
import { Box, Card, Text } from "@chakra-ui/react";

const Comment = (props) => {
  const { comment } = props;
  return (
    <>
      <Card px={5} py={10}>
        <Text>
          {comment.owner}: {comment.body}
        </Text>
      </Card>
      <Box p="1" /> {/*margin on card not working, not sure why*/}
    </>
  );
};

export default Comment;
