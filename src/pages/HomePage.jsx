import useArticles from "../hooks/useAricles";
import SearchField from "../components/SearchField";
import ArticleCard from "../components/ArticleCard";
import OrderDropdown from "../components/OrderDropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import LanguageDropdown from "../components/LanguageDropdown";
import {
  useSearchFilter,
  useOrderFilter,
  useLanguageFilter,
} from "../contexts/FilterContext";

import { Spinner, Text, SimpleGrid, HStack } from "@chakra-ui/react";
import { fetchMoreData } from "../utils/utils";

const HomePage = () => {
  const searchFilter = useSearchFilter();
  const orderFilter = useOrderFilter();
  const languageFilter = useLanguageFilter();

  const { articles, setArticles, error, loaded } = useArticles(
    `/articles/?search=${searchFilter}&ordering=${orderFilter}&primary_language=${languageFilter}`
  );

  return (
    <>
      <SearchField />
      <HStack>
        <OrderDropdown />
        <LanguageDropdown />
      </HStack>
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
          <Text>No results found!</Text>
        )
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default HomePage;
