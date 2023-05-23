import ArticleCard from "../components/ArticleCard";
import InfiniteScroll from "react-infinite-scroll-component";

import { Spinner, Text, SimpleGrid } from "@chakra-ui/react";
import { fetchMoreData } from "../utils/utils";

const ArticleGrid = (props) => {
  const { articles, setArticles, loaded, message } = props;

  return (
    <>
      {loaded ? (
        articles.results.length ? (
          <InfiniteScroll
            dataLength={articles.results.length}
            loader={<Spinner />}
            hasMore={!!articles.next}
            next={() => fetchMoreData(articles, setArticles)}
          >
            <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} p={5} spacing={5}>
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
          <Text>{message}</Text>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ArticleGrid;
