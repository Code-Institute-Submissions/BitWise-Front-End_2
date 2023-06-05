import React from "react";
import {
  Button,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Show,
  Textarea,
  HStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useProfileEdit from "../../hooks/useProfileEdit";
import { useNavigate } from "react-router-dom";

const ProfileEditForm = () => {
  const {
    username,
    profileData,
    imageFile,
    error,
    loaded,
    handleChange,
    handleUsernameChange,
    handleSubmit,
  } = useProfileEdit();

  const navigate = useNavigate();

  const { bio, image } = profileData;

  return (
    <Stack minH={"calc(100vh - 100px)"} direction={"row"}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Edit Your Profile</Heading>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </FormControl>

              {error.username?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="image" isInvalid={Boolean(error?.image)}>
                {image && (
                  <Box my={5}>
                    <Image w="100%" borderRadius="20" src={image} />
                  </Box>
                )}

                <FormLabel htmlFor="image-upload">Profile Image</FormLabel>

                <Input
                  h="100%"
                  p={0}
                  type="file"
                  id="image-upload"
                  ref={imageFile}
                  accept="image/*"
                  onChange={handleChange}
                />
              </FormControl>

              {error?.image?.map((message, idx) => (
                <Alert borderRadius={5} key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="bio">
                <FormLabel>Bio</FormLabel>
                <Textarea
                  bg={"blackAlpha.50"}
                  rows={10}
                  type="text-area"
                  name="bio"
                  value={bio}
                  onChange={handleChange}
                />
              </FormControl>

              {error.article_content?.map((message, idx) => (
                <Alert borderRadius={5} key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <HStack pt={5} justifyContent="space-around">
                <Button
                  type="submit"
                  w="40%"
                  colorScheme={"purple"}
                  variant={"solid"}
                >
                  Submit Updates
                </Button>

                <Button
                  w="40%"
                  colorScheme={"red"}
                  variant={"solid"}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
              </HStack>
            </Stack>
          </form>
        </Stack>
      </Flex>

      <Show above="lg">
        <Flex px="20px" py="20px" maxHeight="calc(100vh)" flex={1}>
          <Image
            borderRadius={"20"}
            alt={"Login Image"}
            objectFit={"cover"}
            src={
              "https://images.unsplash.com/photo-1573643808568-4a3c26f3a06b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
            }
          />
        </Flex>
      </Show>
    </Stack>
  );
};

export default ProfileEditForm;
