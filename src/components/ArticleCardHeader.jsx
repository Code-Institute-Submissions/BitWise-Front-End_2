import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import ArticleUpdateButton from "../components/CardUpdateButton";

const ArticleCardHeader = (props) => {
  const { is_owner, owner, created_at, updated_at, profile_image } = props;

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
      {is_owner && <ArticleUpdateButton />}
    </Flex>
  );
};

export default ArticleCardHeader;
