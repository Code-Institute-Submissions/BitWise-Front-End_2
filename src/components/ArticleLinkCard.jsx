import React, { useState } from "react";
import { Button, Card, CardBody, Heading, Text, Flex } from "@chakra-ui/react";
import UpdateDeleteButton from "./UpdateDeleteButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import useLinkDelete from "../hooks/useLinkDelete";
import ArticleLinkEdit from "./ArticleLinkEdit";

const ArticleLinkCard = (props) => {
  const { is_owner, id, link_title, link_brief, link_url, setLinks } = props;

  const [showEditLink, setShowEditLink] = useState(false);
  const { handleDelete, error } = useLinkDelete(id, setLinks);

  return (
    <>
      {!showEditLink ? (
        <Card borderRight="1px" borderBottom="1px">
          <CardBody>
            <Flex justifyContent="space-between">
              <Heading width="80%" size="sm">
                {link_title}
              </Heading>
              {is_owner && (
                <UpdateDeleteButton
                  icon={<BsThreeDotsVertical />}
                  target={"Link"}
                  handleEdit={() => setShowEditLink(true)}
                  handleDelete={handleDelete}
                />
              )}
            </Flex>
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
              aria-label="Visit Link"
            >
              {link_url.length > 25 ? `${link_url.slice(0, 25)}...` : link_url}
            </Button>
          </CardBody>
        </Card>
      ) : (
        <ArticleLinkEdit
          id={id}
          link_title={link_title}
          link_brief={link_brief}
          link_url={link_url}
          setLinks={setLinks}
          setShowEditLink={setShowEditLink}
        />
      )}
    </>
  );
};

export default ArticleLinkCard;
