import React, { useState, useEffect } from "react";
import { Heading, HStack, Text, Box } from "@chakra-ui/react";
import languageOptions from "../constants/languageOptions";
import truncateContent from "../services/truncateContent";
import { useColorModeValue } from "@chakra-ui/react";

const ArticleCardBody = (props) => {
  const {
    article_content,
    primary_language,
    article_title,
    articlePage,
    github_link,
  } = props;
  const [truncatedContent, setTruncatedContent] = useState("");
  const custColor = useColorModeValue("#805AD5", "#D6BCFA");

  useEffect(() => {
    if (!articlePage) {
      const truncatedContent = truncateContent(article_content, 25);
      setTruncatedContent(truncatedContent);
    }
  }, [articlePage, article_content]);

  return (
    <>
      <Heading mb={5} size="lg">
        {article_title}
      </Heading>
      {primary_language && (
        <HStack pb={4}>
          {languageOptions.map((language) => {
            if (language.value === primary_language) {
              const IconComponent = language.icon;
              return (
                <React.Fragment key={language.value}>
                  <IconComponent fontSize={"20"} />
                  <Heading size="sm">
                    {language.value === "CPlusPlus"
                      ? "C++"
                      : language.value === "CSharp"
                      ? "C#"
                      : language.value}
                  </Heading>
                </React.Fragment>
              );
            }
            return null;
          })}
          {!languageOptions.some(
            (language) => language.value === primary_language
          ) && <Heading size="sm">No Language Recorded</Heading>}
        </HStack>
      )}
      <Box maxW="lg" whiteSpace="pre-line">
        <Text>{articlePage ? article_content : truncatedContent}</Text>
      </Box>
      {github_link && (
        <Box>
          <Heading mt={5} size="sm">
            GitHub Link:
          </Heading>
          <a href={github_link} target="_blank">
            <Text color={custColor} as="u">
              {github_link}
            </Text>
          </a>
        </Box>
      )}
    </>
  );
};

export default ArticleCardBody;
