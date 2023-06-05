import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { axiosReq } from "../../api/axiosDefaults";
import { CanceledError } from "axios";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";
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

const ProfileEditForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    bio: "",
    image: "",
  });

  const { bio, image } = profileData;

  const [error, setError] = useState({});
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    const getProfileData = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`, {
            signal: controller.signal,
          });
          const { bio, image } = data;
          setProfileData({
            bio,
            image,
          });
          setLoaded(true);
        } catch (err) {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoaded(true);
        }
      } else {
        navigate("/");
      }
    };

    setLoaded(false);
    getProfileData();

    return () => controller.abort();
  }, [currentUser, navigate, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("bio", bio);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
      navigate(`/profile/${id}/`);

      setCurrentUser((prevCurrentUser) => ({
        ...prevCurrentUser,
        profile_image: data.image,
      }));
    } catch (err) {
      console.log(err);
      setError(err.response?.data);
    }
  };

  return (
    <Stack minH={"calc(100vh - 100px)"} direction={"row"}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Edit Your Profile</Heading>

          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="image" isInvalid={Boolean(error?.image)}>
                {image && (
                  <Box my={5}>
                    <Image w="100%" borderRadius="20" src={image} fluid />
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
                  onChange={(e) => {
                    if (e.target.files.length) {
                      setProfileData({
                        ...profileData,
                        image: URL.createObjectURL(e.target.files[0]),
                      });
                    }
                  }}
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
