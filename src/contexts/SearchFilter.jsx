import { createContext, useContext, useEffect, useState } from "react";

export const SearchFilterContext = createContext();
export const SetSearchFilterContext = createContext();

export const useSearchFilter = () => useContext(SearchFilterContext);
export const useSetSearchFilter = () => useContext(SetSearchFilterContext);

export const SearchFilterProvider = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <SearchFilterContext.Provider value={searchFilter}>
      <SetSearchFilterContext.Provider value={setSearchFilter}>
        {children}
      </SetSearchFilterContext.Provider>
    </SearchFilterContext.Provider>
  );
};
