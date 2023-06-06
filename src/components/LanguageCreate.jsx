import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Flex,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import useLanguageCreate from "../hooks/useLanguageCreate";
import { RiMailSendLine } from "react-icons/ri";

const LanguageCreate = (props) => {
  const { profile, setLanguages } = props;

  const custColor = useColorModeValue("#FAF5FF", "#4A5568");
  const custCommentBg = useColorModeValue("#805AD5", "#2D3748");

  const {
    language,
    confidence,
    used_since,
    errors,
    handleChange,
    handleSubmit,
  } = useLanguageCreate(profile, setLanguages);

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit}>
        <Stack pb={3} w="100%">
          <Box borderRadius={5} p={2} bg={custCommentBg} w="100%">
            <FormControl id="language">
              <FormLabel>Language</FormLabel>
              <Input
                type="text"
                name="language"
                value={language}
                onChange={handleChange}
              />
              {errors.language && (
                <Alert mt={2} borderRadius={5} status="warning">
                  <AlertIcon />
                  {errors.language[0]}
                </Alert>
              )}
              {errors.detail && (
                <Alert mt={2} borderRadius={5} status="warning">
                  <AlertIcon />
                  {errors.detail[0]}
                </Alert>
              )}
            </FormControl>

            <FormControl id="confidence">
              <FormLabel>Confidence</FormLabel>
              <Input
                type="text"
                name="confidence"
                value={confidence}
                onChange={handleChange}
              />
              {errors.confidence && (
                <Alert mt={2} borderRadius={5} status="warning">
                  <AlertIcon />
                  {errors.confidence[0]}
                </Alert>
              )}
            </FormControl>

            <Flex mt={2} justifyContent={"end"}>
              <Button type="submit">
                <RiMailSendLine />
              </Button>
            </Flex>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default LanguageCreate;
