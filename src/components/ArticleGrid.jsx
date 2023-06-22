import React, { useRef, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner, SimpleGrid, Box } from "@chakra-ui/react";
import { fetchMoreData } from "../utils/utils";
import CardSkeleton from "./CardSkeleton";
import NoResults from "./NoResults";

const ArticleGrid = (props) => {
  const { articles, setArticles, loaded, message } = props;
  const skeletons = [1, 2, 3, 4, 5, 6];
  const containerRef = useRef();

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const scrollOffset =
        container.scrollHeight - container.scrollTop - containerRect.height;
      const buffer = 50;

      if (scrollOffset <= buffer && !!articles.next) {
        fetchMoreData(articles, setArticles, containerRef);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [articles, setArticles]);

  return (
    <>
      {loaded ? (
        articles.results.length ? (
          <InfiniteScroll
            dataLength={articles.results.length}
            loader={<Spinner />}
            hasMore={!!articles.next}
            next={() => fetchMoreData(articles, setArticles, containerRef)}
          >
            <SimpleGrid
              ref={containerRef}
              id="article-grid-container"
              columns={{ sm: 1, md: 2, xl: 3 }}
              p={5}
              spacing={5}
            >
              {articles.results.map((article) => (
                <ArticleCard
                  key={article.id}
                  {...article}
                  setArticles={setArticles}
                />
              ))}
            </SimpleGrid>
          </InfiniteScroll>
        ) : (
          <Box m={5}>
            <NoResults text={message} />
          </Box>
        )
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

export default ArticleGrid;
