import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Progress } from "@chakra-ui/react";
import languageOptions from "../constants/languageOptions";

const LanguageCard = (props) => {
  const { language, confidence, used_since, years_exp } = props;
  return (
    <Card mb={5}>
      <CardHeader>
        {languageOptions.map((lan) => {
          if (lan.value === language) {
            const IconComponent = lan.icon;
            return (
              <Flex mb={2} key={lan.value}>
                <IconComponent fontSize={20} />
                <Heading ml={2} size="sm">
                  {lan.value === "CPlusPlus"
                    ? "C++"
                    : lan.value === "CSharp"
                    ? "C#"
                    : lan.value}
                </Heading>
              </Flex>
            );
          }
          return null;
        })}
        {years_exp > 1 ? (
          <Text>{years_exp} years of experience</Text>
        ) : (
          <Text>{years_exp} year of experience</Text>
        )}
      </CardHeader>

      <CardBody>
        <Heading my={2} size="sm">
          Confidence ({confidence}/100):
        </Heading>
        {confidence > 70 ? (
          <Progress colorScheme="green" value={confidence} />
        ) : confidence > 50 ? (
          <Progress colorScheme="yellow" value={confidence} />
        ) : (
          <Progress colorScheme="red" value={confidence} />
        )}
      </CardBody>
    </Card>
  );
};

export default LanguageCard;
