import React, { useState } from "react";
import {
  Card,
  Box,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Flex,
  Progress,
} from "@chakra-ui/react";
import languageOptions from "../constants/languageOptions";
import UpdateDeleteButton from "./UpdateDeleteButton";
import { BsThreeDotsVertical } from "react-icons/bs";
import LanguageEdit from "./LanguageEdit";

const LanguageCard = (props) => {
  const {
    language,
    confidence,
    used_since,
    years_exp,
    is_owner,
    id,
    setLanguages,
  } = props;

  const [showEditLanguage, setShowEditLanguage] = useState(false);

  return (
    <>
      {!showEditLanguage ? (
        <Card mb={5}>
          <CardHeader>
            <Flex justifyContent="space-between">
              <Box>
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
                {used_since ? (
                  years_exp >= 2 ? (
                    <Text>{years_exp} years of experience</Text>
                  ) : years_exp >= 1 ? (
                    <Text>{years_exp} year of experience</Text>
                  ) : (
                    <Text>{years_exp} of experience</Text>
                  )
                ) : null}
              </Box>

              <Box>
                {is_owner && (
                  <UpdateDeleteButton
                    icon={<BsThreeDotsVertical />}
                    target={"Language"}
                    handleEdit={() => setShowEditLanguage(true)}
                    handleDelete={() => {}}
                  />
                )}
              </Box>
            </Flex>
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
      ) : (
        <LanguageEdit
          language={language}
          confidence={confidence}
          used_since={used_since}
          setShowEditLanguage={setShowEditLanguage}
          setLanguages={setLanguages}
          id={id}
        />
      )}
    </>
  );
};

export default LanguageCard;
