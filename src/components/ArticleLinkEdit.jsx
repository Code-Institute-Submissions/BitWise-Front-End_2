import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Flex,
  Alert,
  AlertIcon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import useLinkEdit from "../hooks/useLinkEdit";
import { RiMailSendLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const ArticleLinkEdit = (props) => {
  const { id, link_title, link_brief, link_url, setLinks, setShowEditLink } =
    props;

  const {
    updated_link_brief,
    updated_link_url,
    errors,
    handleChange,
    handleSubmit,
  } = useLinkEdit(
    id,
    link_title,
    link_brief,
    link_url,
    setLinks,
    setShowEditLink
  );

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit}>
        <Stack pb={3} w="100%">
          <Box
            borderRadius={5}
            p={5}
            border={"1px solid"}
            borderRight={"2px solid "}
            borderBottom={"2px solid"}
            borderColor="purple.300"
            w="100%"
          >
            <Heading size="md">Update Link: {link_title}</Heading>
            <FormControl mt={5} id="link_brief">
              <FormLabel>Update Info About Link</FormLabel>

              <Textarea
                rows={4}
                type="text-area"
                name="updated_link_brief"
                value={updated_link_brief}
                onChange={handleChange}
              />

              {errors.link_brief && (
                <Alert mt={2} borderRadius={5} status="warning">
                  <AlertIcon />
                  {errors.link_brief[0]}
                </Alert>
              )}
            </FormControl>

            <FormControl mt={5} id="link_url">
              <FormLabel>Provide Info About Link</FormLabel>

              <InputGroup>
                <Input
                  placeholder="mysite"
                  type="text"
                  name="updated_link_url"
                  value={updated_link_url}
                  onChange={handleChange}
                />
              </InputGroup>

              {errors.link_url && (
                <Alert mt={2} borderRadius={5} status="warning">
                  <AlertIcon />
                  {errors.link_url[0]}
                </Alert>
              )}
            </FormControl>

            <Flex mt={2} justifyContent={"end"}>
              <Button mr={1} onClick={() => setShowEditLink(false)}>
                <RxCross2 />
              </Button>
              <Button type="submit">
                <RiMailSendLine />
              </Button>
            </Flex>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default ArticleLinkEdit;
