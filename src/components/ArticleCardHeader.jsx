import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Text,
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import useArticleDelete from "../hooks/useArticleDelete";
import { useNavigate } from "react-router-dom";
import UpdateDeleteButton from "./UpdateDeleteButton";

const ArticleCardHeader = (props) => {
  const {
    is_owner,
    pk,
    owner,
    created_at,
    updated_at,
    profile_id,
    profile_image,
    setArticles,
  } = props;

  const navigate = useNavigate();
  const cancelRef = React.useRef();

  const handleEdit = () => {
    navigate(`/article/edit/${pk}/`);
  };

  const { handleDelete, handleDeleteConfirmation, error, isOpen, onClose } =
    useArticleDelete(pk, setArticles);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <Flex spacing="4">
      <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
        <Link to={`/profile/${profile_id}`}>
          <Avatar name={owner} bg={"purple.500"} src={profile_image} />
        </Link>
        <Box>
          <Heading size="sm">{owner}</Heading>
          <Text>{created_at}</Text>
          <Text>{updated_at && `(Edited: ${updated_at})`}</Text>
        </Box>
      </Flex>
      {is_owner && (
        <UpdateDeleteButton
          icon={<BsThreeDotsVertical />}
          target={"Article"}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Article
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this article?
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
    </Flex>
  );
};

export default ArticleCardHeader;
