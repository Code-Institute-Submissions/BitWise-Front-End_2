import React from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import useRecommendCreate from "../hooks/useRecommendCreate";

const RecommendedAlert = ({ isOpen, onClose, profiles }) => {
  const cancelRef = React.useRef();
  const { recommended_to, errors, handleChange, handleSubmit } =
    useRecommendCreate();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <form onSubmit={handleSubmit}>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Recommend Article
            </AlertDialogHeader>

            <AlertDialogBody>
              <FormControl id="recommend">
                <FormLabel>Recommend to:</FormLabel>
                <Select
                  placeholder="Select option"
                  name="recommended_to"
                  value={recommended_to}
                  onChange={handleChange}
                >
                  {profiles.map((profile) => (
                    <option key={profile.id} value={profile.id}>
                      {profile.owner}
                    </option>
                  ))}
                </Select>
              </FormControl>
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
              >
                Submit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </form>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default RecommendedAlert;
