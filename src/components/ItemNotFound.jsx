import React from "react";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Text,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ItemNotFound = (props) => {
  const { item } = props;
  return (
    <Card align="center">
      <CardHeader>
        <Heading size="md">{item} not found!</Heading>
      </CardHeader>
      <CardBody>
        <Text>This {item} does not appear to exist on this site.</Text>
      </CardBody>
      <CardFooter>
        <Link to="/">
          <Button colorScheme="purple" aria-label="Back Home">
            Back Home
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ItemNotFound;
