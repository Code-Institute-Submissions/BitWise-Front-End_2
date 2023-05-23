import {
  useSetSearchFilter,
  useSetOrderFilter,
  useSetLanguageFilter,
  useSetLikedByOwnerFilter,
} from "../contexts/FilterContext";

export function useResetFilters() {
  const setSearchFilter = useSetSearchFilter();
  const setOrderFilter = useSetOrderFilter();
  const setLanguageFilter = useSetLanguageFilter();
  const setLikedByOwnerFilter = useSetLikedByOwnerFilter();

  return () => {
    setSearchFilter(""); // Reset search filter
    setOrderFilter(""); // Reset order filter
    setLanguageFilter(""); // Reset language filter
    setLikedByOwnerFilter(""); // Reset liked by owner filter
  };
}
