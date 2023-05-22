import { createContext, useContext, useState } from "react";

export const SearchFilterContext = createContext();
export const SetSearchFilterContext = createContext();

export const OrderFilterContext = createContext();
export const SetOrderFilterContext = createContext();

export const useSearchFilter = () => useContext(SearchFilterContext);
export const useSetSearchFilter = () => useContext(SetSearchFilterContext);

export const useOrderFilter = () => useContext(OrderFilterContext);
export const useSetOrderFilter = () => useContext(SetOrderFilterContext);

export const FilterProvider = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [orderFilter, setOrderFilter] = useState("");

  return (
    <SearchFilterContext.Provider value={searchFilter}>
      <SetSearchFilterContext.Provider value={setSearchFilter}>
        <OrderFilterContext.Provider value={orderFilter}>
          <SetOrderFilterContext.Provider value={setOrderFilter}>
            {children}
          </SetOrderFilterContext.Provider>
        </OrderFilterContext.Provider>
      </SetSearchFilterContext.Provider>
    </SearchFilterContext.Provider>
  );
};
