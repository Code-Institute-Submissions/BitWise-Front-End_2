import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa";
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
import ArticleGrid from "./articles/ArticleGrid";
import LoggedIn from "../components/LoggedIn";
import { useResetFilters } from "../hooks/useResetFilters";
import { useCurrentUser } from "../contexts/CurrentUserContext";

import { useColorModeValue } from "@chakra-ui/react";

const HomePage = (props) => {
  const { routeFilter = "", message } = props;
  const searchFilter = useSearchFilter();
  const orderFilter = useOrderFilter();
  const languageFilter = useLanguageFilter();
  const likedByOwnerFilter = useLikedByOwnerFilter();
  const currentUser = useCurrentUser();

  const resetFilters = useResetFilters();
  const { pathname } = useLocation();

  const custBgColor = useColorModeValue("#805AD5", "#B794F4");
  const custHoverColor = useColorModeValue("#B794F4", "#805AD5");

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

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const handleScroll = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    setShowScrollToTop(scrollTop > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <LoggedIn />
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
        <Show below="md">
          <LikedSwitch />
        </Show>
      )}
      <ArticleGrid
        articles={articles}
        setArticles={setArticles}
        loaded={loaded}
        message={message}
      />
      {showScrollToTop && (
        <IconButton
          icon={<FaArrowUp />}
          aria-label="Scroll to top"
          position="fixed"
          bottom="4"
          right="4"
          bg={custBgColor}
          _hover={{
            bg: custHoverColor,
          }}
          color="white"
          onClick={scrollToTop}
        />
      )}
    </>
  );
};

export default HomePage;
