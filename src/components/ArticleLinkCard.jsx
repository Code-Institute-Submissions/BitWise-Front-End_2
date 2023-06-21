import React from "react";
import { Button, Card, CardBody, Heading, Text } from "@chakra-ui/react";

const ArticleLinkCard = (props) => {
  const { link_title, link_brief, link_url } = props;

  return (
    <Card borderRight="1px" borderBottom="1px">
      <CardBody>
        <Heading size="sm">{link_title}</Heading>
        <Text whiteSpace="pre-line" mt={3}>
          {link_brief}
        </Text>

        <Button
          as="a"
          href={link_url}
          target="_blank"
          rel="noopener noreferrer"
          mt={5}
          justifyContent="start"
          w="100%"
          colorScheme="purple"
          p={5}
        >
          {link_url}
        </Button>
      </CardBody>
    </Card>
  );
};

export default ArticleLinkCard;
