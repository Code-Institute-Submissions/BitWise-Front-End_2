import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { HStack, Show, Hide, Text } from "@chakra-ui/react";
import ArticleGrid from "../components/ArticleGrid";
import { useResetFilters } from "../hooks/useResetFilters";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const HomePage = (props) => {
  const { routeFilter = "", message } = props;
  const searchFilter = useSearchFilter();
  const orderFilter = useOrderFilter();
  const languageFilter = useLanguageFilter();
  const likedByOwnerFilter = useLikedByOwnerFilter();
  const currentUser = useCurrentUser();

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
      <SearchField />
      <HStack>
        <OrderDropdown />
        <LanguageDropdown />
        {currentUser && (
          <Show above="md">
            <LikedSwitch />
          </Show>
        )}
      </HStack>
      {currentUser && (
        <Hide above="md">
          <LikedSwitch />
        </Hide>
      )}
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
