import useArticles from "../hooks/useAricles";
import SearchField from "../components/SearchField";
import OrderDropdown from "../components/OrderDropdown";
import LanguageDropdown from "../components/LanguageDropdown";
import LikedSwitch from "../components/LikedSwitch";
import {
  useSearchFilter,
  useOrderFilter,
  useLanguageFilter,
  useLikedByOwnerFilter,
} from "../contexts/FilterContext";

import { HStack, Show } from "@chakra-ui/react";
import ArticleGrid from "../components/ArticleGrid";
import LoggedIn from "../components/LoggedIn";
import { useEffect } from "react";

import { useResetFilters } from "../hooks/useResetFilters";
import { useLocation } from "react-router-dom";

const HomePage = (props) => {
  const { routeFilter = "", message } = props;
  const searchFilter = useSearchFilter();
  const orderFilter = useOrderFilter();
  const languageFilter = useLanguageFilter();
  const likedByOwnerFilter = useLikedByOwnerFilter();

  const resetFilters = useResetFilters();
  const { pathname } = useLocation();

  useEffect(() => {
    resetFilters();
  }, [pathname]);

  const { articles, setArticles, loaded } = useArticles(
    `/articles/?${routeFilter}&search=${searchFilter}&ordering=${orderFilter}` +
      `${
        likedByOwnerFilter ? `&likes__owner__profile=${likedByOwnerFilter}` : ""
      }` +
      `&primary_language=${languageFilter}`
  );

  return (
    <>
      <LoggedIn />
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
      <ArticleGrid
        articles={articles}
        setArticles={setArticles}
        loaded={loaded}
        message={message}
      />
    </>
  );
};

export default HomePage;
