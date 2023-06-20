import React from "react";
import { Text, Card, Flex, CardBody, CardFooter } from "@chakra-ui/react";
import NoResults from "./NoResults";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@chakra-ui/react";

const RecommendedList = (props) => {
  const { received_recommendations } = props;
  const custFooterColor = useColorModeValue("#FAF5FF", "#D6BCFA");

  return (
    <>
      {received_recommendations.length ? (
        received_recommendations.map((recommendation) => (
          <Card m={5} key={recommendation.id} overflow={"hidden"}>
            <CardBody bg={custFooterColor} color="black">
              <Link to={`/article/${recommendation.article_id}`}>
                <Text fontWeight="700">{recommendation.article_title}</Text>
              </Link>
            </CardBody>
            <CardFooter>
              <Text fontSize="sm">
                Recommended By:{" "}
                <Link to={`/profile/${recommendation.recommending_id}`}>
                  {recommendation.recommending_username}
                </Link>
              </Text>
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
