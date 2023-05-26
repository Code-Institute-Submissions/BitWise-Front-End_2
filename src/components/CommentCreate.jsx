import React from "react";
import {
  Box,
  FormControl,
  Textarea,
  Stack,
  Button,
  Flex,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import { RiMailSendLine } from "react-icons/ri";

const CommentCreate = (props) => {
  const { article, setArticle, setComments } = props;
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const custColor = useColorModeValue("#FAF5FF", "#4A5568");
  const custCommentBg = useColorModeValue("#805AD5", "#2D3748");

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        article,
        body,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setArticle((prevArticle) => ({
        results: [
          {
            ...prevArticle.results[0],
            comments_count: prevArticle.results[0].comments_count + 1,
          },
        ],
      }));
      setBody("");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Stack pb={3} w="100%">
            <Box borderRadius={5} p={2} bg={custCommentBg} w="100%">
              <Textarea
                bg={custColor}
                placeholder="Enter comment here..."
                value={body}
                onChange={handleChange}
              />
              {errors.body?.map((message, idx) => (
                <Alert mt={2} borderRadius={5} key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}
              <Flex mt={2} justifyContent={"end"}>
                <Button type="submit">
                  <RiMailSendLine />
                </Button>
              </Flex>
            </Box>
          </Stack>
        </FormControl>
      </form>
    </Box>
  );
};

export default CommentCreate;
