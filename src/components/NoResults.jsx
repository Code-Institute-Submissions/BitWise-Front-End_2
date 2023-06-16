import React from "react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const NoResults = (props) => {
  const { text } = props;
  return (
    <Alert colorScheme="purple" borderRadius={10} status="error">
      <AlertIcon />
      <AlertTitle>{text}</AlertTitle>
    </Alert>
  );
};

export default NoResults;
