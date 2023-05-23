import useArticles from "../hooks/useAricles";
import SearchField from "../components/SearchField";
import ArticleCard from "../components/ArticleCard";
import OrderDropdown from "../components/OrderDropdown";
import InfiniteScroll from "react-infinite-scroll-component";
import LanguageDropdown from "../components/LanguageDropdown";
import LikedSwitch from "../components/LikedSwitch";
import {
  useSearchFilter,
  useOrderFilter,
  useLanguageFilter,
  useLikedByOwnerFilter,
} from "../contexts/FilterContext";

import { Spinner, Text, SimpleGrid, HStack, Show } from "@chakra-ui/react";
import { fetchMoreData } from "../utils/utils";

const HomePage = () => {
  const searchFilter = useSearchFilter();
  const orderFilter = useOrderFilter();
  const languageFilter = useLanguageFilter();
  const likedByOwnerFilter = useLikedByOwnerFilter();

  const { articles, setArticles, loaded } = useArticles(
    `/articles/?search=${searchFilter}
               &ordering=${orderFilter}
               ${
                 likedByOwnerFilter
                   ? `&likes__owner__profile=${likedByOwnerFilter}`
                   : ""
               }
               &primary_language=${languageFilter}`
  );

  return (
    <>
      <SearchField />
      <HStack>
        <OrderDropdown />
        <LanguageDropdown />
        <Show above="md">
          <LikedSwitch />
        </Show>
      </HStack>
      <Show below="md">
        <LikedSwitch />
      </Show>

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
