import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import ArticleGrid from "./ArticleGrid";
import useProfileArticles from "../hooks/useProfileArticles";
import CardSkeleton from "./CardSkeleton";

const ProfileArticles = (props) => {
  const { endpoint } = props;
  const { profileArticles, setProfileArticles, loaded, error } =
    useProfileArticles(endpoint);
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <>
      {loaded ? (
        <ArticleGrid
          articles={profileArticles}
          setArticles={setProfileArticles}
          loaded={loaded}
          message={
            <>
              No Results Found!
              <br />
              No articles by this profile meeting the search criteria.
            </>
          }
        />
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} p={5} spacing={5}>
          {skeletons.map((skeleton) => (
            <CardSkeleton height={350} key={skeleton} />
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default ProfileArticles;
