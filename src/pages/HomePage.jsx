import useArticles from "../hooks/useAricles";
import SearchField from "../components/SearchField";
import ArticleCard from "../components/ArticleCard";
import OrderDropdown from "../components/OrderDropdown";
import LanguageDropdown from "../components/LanguageDropdown";
import {
  useSearchFilter,
  useOrderFilter,
  useLanguageFilter,
} from "../contexts/FilterContext";

import { Spinner, Text, SimpleGrid, HStack } from "@chakra-ui/react";

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
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 3 }} p={5} spacing={5}>
        {loaded ? (
          articles.results.length ? (
            articles.results.map((article) => (
              <ArticleCard
                key={article.id}
                {...article}
                setArticles={setArticles}
              />
            ))
          ) : (
            <Text>{error}</Text>
          )
        ) : (
          <Spinner />
        )}
      </SimpleGrid>
    </>
  );
};

export default HomePage;
