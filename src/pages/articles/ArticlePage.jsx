import React from "react";
import {
  Card,
  CardHeader,
  Flex,
  Heading,
  Text,
  Avatar,
  Box,
  IconButton,
  CardBody,
  CardFooter,
  Button,
  Show,
  HStack,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiUserPlus } from "react-icons/bi";
import { SiPython } from "react-icons/si";

const ArticlePage = () => {
  return (
    <Flex p={8} flex={1} align={"center"} justify={"center"}>
      <Card maxW="lg">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar name="XXX XXX" bg={"purple.500"} />

              <Box>
                <Heading size="sm">Add Article Title Here</Heading>
                <Text>Add Author Here</Text>
              </Box>
            </Flex>

            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
              icon={<BsThreeDotsVertical />}
            />
          </Flex>
        </CardHeader>

        <CardBody pt={0}>
          <HStack pb={4}>
            <SiPython fontSize={"30"} />
            <Heading>Python</Heading>
          </HStack>

          <Text>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem
            doloremque similique totam? Odio enim quasi quisquam in blanditiis
            fuga quas porro inventore adipisci dicta voluptatum, assumenda
            perferendis, suscipit quam optio sint, obcaecati vitae? Iure
            deleniti, perspiciatis ipsam, modi inventore consectetur hic quas
            quisquam doloremque minima incidunt numquam sint rem dolorem?
          </Text>
        </CardBody>

        <CardFooter justify="space-between" flexWrap="wrap">
          <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
            <Show above="sm">Like</Show>
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BiChat />}>
            <Show above="sm">Comment</Show>
          </Button>
          <Button flex="1" variant="ghost" leftIcon={<BiUserPlus />}>
            <Show above="sm">Follow</Show>
          </Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};

export default ArticlePage;
