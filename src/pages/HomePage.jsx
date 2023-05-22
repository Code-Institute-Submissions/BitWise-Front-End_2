import ArticleCard from "../components/ArticleCard";
import { Spinner, Text, SimpleGrid } from "@chakra-ui/react";
import useArticles from "../hooks/useAricles";
import { useSearchFilter } from "../contexts/SearchFilter";
import SearchField from "../components/SearchField";

const HomePage = () => {
  const searchFilter = useSearchFilter();

  const { articles, setArticles, error, loaded } = useArticles(
    `/articles/?search=${searchFilter}`
  );

  return (
    <>
      <SearchField />
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
