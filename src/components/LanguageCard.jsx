import React from "react";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";

const LanguageCard = (props) => {
  const { language, confidence, used_since } = props;
  return (
    <Card>
      <CardHeader>
        <Heading size="sm">{language}</Heading>
      </CardHeader>
      <Progress colorScheme="purple" value={confidence} />
    </Card>
  );
};

export default LanguageCard;
