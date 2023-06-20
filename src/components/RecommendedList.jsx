import React from "react";
import { Text, Card, CardBody, CardFooter, VStack } from "@chakra-ui/react";
import NoResults from "./NoResults";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";

const RecommendedList = (props) => {
  const { received_recommendations } = props;
  const custFooterColor = useColorModeValue("#FAF5FF", "#D6BCFA");
  const custLinkColor = useColorModeValue("#805AD5", "#D6BCFA");

  return (
    <>
      {received_recommendations.length ? (
        received_recommendations.map((recommendation) => (
          <Card m={5} key={recommendation.id} overflow={"hidden"}>
            <CardBody bg={custFooterColor} color="black">
              <Link to={`/article/${recommendation.article_id}`}>
                <Text as="u" fontWeight="700">
                  {recommendation.article_title}
                </Text>
              </Link>
            </CardBody>
            <CardFooter>
              <VStack alignItems="start">
                <Text fontSize="sm">
                  Recommended By:{" "}
                  <Link to={`/profile/${recommendation.recommending_id}`}>
                    <Text as="u" fontWeight="bold" color={custLinkColor}>
                      {recommendation.recommending_username}
                    </Text>
                  </Link>
                </Text>
                <Text fontSize="xs">{recommendation.created_at}</Text>
              </VStack>
            </CardFooter>
          </Card>
        ))
      ) : (
        <NoResults text={"No Recommended Articles Found!"} />
      )}
    </>
  );
};

export default RecommendedList;
