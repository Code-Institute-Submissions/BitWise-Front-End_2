import React, { useState } from "react";
import {
  Box,
  InputLeftElement,
  Input,
  InputGroup,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  FormControl,
  FormLabel,
  Spinner,
  Flex,
  Text,
  Heading,
} from "@chakra-ui/react";
import useRecommendCreate from "../hooks/useRecommendCreate";

import { SlMagnifier } from "react-icons/sl";
import useListProfiles from "../hooks/useListProfiles";

const RecommendedAlert = ({ isOpen, onClose }) => {
  const cancelRef = React.useRef();
  const { recommended_to, errors, handleChange, handleSubmit } =
    useRecommendCreate();

  const [searchProfile, setSearchProfile] = useState("");

  const { searchPageProfiles, loaded } = useListProfiles(
    `/profiles/?ordering=-followed_count&search=${searchProfile}`
  );

  const handleButtonClick = (profileId) => {
    handleChange({
      target: {
        name: "recommended_to",
        value: profileId,
      },
    });
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Recommend Article
          </AlertDialogHeader>

          <Box px={5}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <FormControl id="user">
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SlMagnifier />
                  </InputLeftElement>
                  <Input
                    type="text"
                    name="user"
                    placeholder="placeholder"
                    value={searchProfile}
                    onChange={(event) => setSearchProfile(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </form>
          </Box>

          <form onSubmit={handleSubmit}>
            <AlertDialogBody>
              <Heading my={5} fontSize="lg">
                Recommend to:
              </Heading>

              {loaded ? (
                <Box>
                  <Flex flexWrap="wrap">
                    {searchPageProfiles?.results.map((profile) => (
                      <Button
                        key={profile.id}
                        onClick={() => handleButtonClick(profile.id)}
                        mr={2}
                        mb={2}
                        variant={
                          recommended_to === profile.id ? "solid" : "outline"
                        }
                        colorScheme={
                          recommended_to === profile.id ? "purple" : "gray"
                        }
                        aria-label={
                          recommended_to === profile.id
                            ? "Selected Profile"
                            : "Profile"
                        }
                      >
                        {profile.owner}
                      </Button>
                    ))}
                  </Flex>
                </Box>
              ) : (
                <Flex py={2}>
                  <Text pr={2}>Updating...</Text>
                  <Spinner />
                </Flex>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="purple"
                type="submit"
                onClick={onClose}
                ml={3}
                aria-label="Submit"
              >
                Submit
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default RecommendedAlert;
