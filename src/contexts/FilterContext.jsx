import { createContext, useContext, useState } from "react";

export const SearchFilterContext = createContext();
export const SetSearchFilterContext = createContext();
export const useSearchFilter = () => useContext(SearchFilterContext);
export const useSetSearchFilter = () => useContext(SetSearchFilterContext);

export const OrderFilterContext = createContext();
export const SetOrderFilterContext = createContext();
export const useOrderFilter = () => useContext(OrderFilterContext);
export const useSetOrderFilter = () => useContext(SetOrderFilterContext);

export const LanguageFilterContext = createContext();
export const SetLanguageFilterContext = createContext();
export const useLanguageFilter = () => useContext(LanguageFilterContext);
export const useSetLanguageFilter = () => useContext(SetLanguageFilterContext);

export const FilterProvider = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [orderFilter, setOrderFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  return (
    <SearchFilterContext.Provider value={searchFilter}>
      <SetSearchFilterContext.Provider value={setSearchFilter}>
        <OrderFilterContext.Provider value={orderFilter}>
          <SetOrderFilterContext.Provider value={setOrderFilter}>
            <LanguageFilterContext.Provider value={languageFilter}>
              <SetLanguageFilterContext.Provider value={setLanguageFilter}>
                {children}
              </SetLanguageFilterContext.Provider>
            </LanguageFilterContext.Provider>
          </SetOrderFilterContext.Provider>
        </OrderFilterContext.Provider>
      </SetSearchFilterContext.Provider>
    </SearchFilterContext.Provider>
  );
};
