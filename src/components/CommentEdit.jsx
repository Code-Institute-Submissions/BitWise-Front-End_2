import React, { useState } from "react";
import {
  Box,
  Stack,
  FormControl,
  Alert,
  AlertIcon,
  Input,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { axiosRes } from "../api/axiosDefaults";

const CommentEdit = (props) => {
  const { id, body, setShowEditComment, setComments } = props;

  const [commentBody, setCommentBody] = useState(body);
  const [errors, setErrors] = useState("");

  const handleChange = (event) => {
    setCommentBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosRes.put(`/comments/${id}/`, {
        body: commentBody.trim(),
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                body: commentBody.trim(),
              }
            : comment;
        }),
      }));
      setShowEditComment(false);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Box p={5}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="commentBody">
            <Input
              type="text-area"
              name="commentBody"
              value={commentBody}
              onChange={handleChange}
            />
          </FormControl>

          {errors.body?.map((message, idx) => (
            <Alert borderRadius={5} key={idx} status="warning">
              <AlertIcon />
              {message}
            </Alert>
          ))}

          <Flex justifyContent="flex-end">
            <Button mr={1} onClick={() => setShowEditComment(false)}>
              <RxCross2 />
            </Button>
            <Button type="submit">
              <FiSend />
            </Button>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};

export default CommentEdit;
