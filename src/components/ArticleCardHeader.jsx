import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import ArticleCardUpdateButton from "../components/ArticleCardUpdateButton";
import { useNavigate } from "react-router-dom";
import { axiosRes } from "../api/axiosDefaults";

import { useParams } from "react-router-dom";

const ArticleCardHeader = (props) => {
  const { is_owner, pk, owner, created_at, updated_at, profile_image } = props;

  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = () => {
    navigate(`/article/edit/${pk}/`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/articles/${pk}/`);
      if (id) {
        navigate(-1);
      } else {
        navigate(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex spacing="4">
      <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
        <Link to={`/profiles/`}>
          <Avatar name={owner} bg={"purple.500"} src={profile_image} />
        </Link>
        <Box>
          <Heading size="sm">{owner}</Heading>
          <Text>
            {created_at}
            {updated_at && `(Updated: ${updated_at})`}
          </Text>
        </Box>
      </Flex>
      {is_owner && (
        <ArticleCardUpdateButton
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </Flex>
  );
};

export default ArticleCardHeader;
