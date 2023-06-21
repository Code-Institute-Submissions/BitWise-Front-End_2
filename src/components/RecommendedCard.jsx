import React from "react";
import {
  Text,
  Card,
  CardBody,
  CardFooter,
  VStack,
  Flex,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import useRecommendDelete from "../hooks/useRecommendDelete";

const RecommendedCard = (props) => {
  const { recommendation } = props;
  const custFooterColor = useColorModeValue("#FAF5FF", "#D6BCFA");
  const custLinkColor = useColorModeValue("#805AD5", "#D6BCFA");
  const custColor = useColorModeValue("#E2E8F0", "#718096");
  const custColorText = useColorModeValue("black", "white");
  const cancelRef = React.useRef();

  const { handleDelete, handleDeleteConfirmation, error, isOpen, onClose } =
    useRecommendDelete(recommendation.id);
  return (
    <Card m={5} key={recommendation.id} overflow={"hidden"}>
      <CardBody bg={custFooterColor} color="black">
        <Flex justifyContent="space-between" alignItems="center">
          <Link to={`/article/${recommendation.article_id}`}>
            <Text as="u" fontWeight="700">
              {recommendation.article_title}
            </Text>
          </Link>
          <Button
            colorScheme="purple"
            bg={custColor}
            color={custColorText}
            onClick={handleDelete}
          >
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Delete Recommendation?
                  </AlertDialogHeader>
                  <AlertDialogBody>
                    <Text mb={5}>
                      Are you sure you want to delete this recommendation?
                    </Text>
                    <Text>
                      Rest assured this will not delete the article. Just remove
                      it from your recommended list.
                    </Text>
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={handleDeleteConfirmation}
                      ml={3}
                    >
                      Delete
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
            <AiOutlineClose fontSize="120%" />
          </Button>
        </Flex>
      </CardBody>
      <CardFooter>
        <VStack alignItems="start">
          <Text fontSize="sm">
            Recommended By:{" "}
            <Link to={`/profile/${recommendation.recommending_id}`}>
              <Text as="u" fontWeight="bold" color={custLinkColor}>
                {recommendation.recommending_username}
              </Text>
            </Link>
          </Text>
          <Text fontSize="xs">{recommendation.created_at}</Text>
        </VStack>
      </CardFooter>
    </Card>
  );
};

export default RecommendedCard;
