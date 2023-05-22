import React from "react";
import {
  Input,
  Box,
  FormControl,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useSearchFilter, useSetSearchFilter } from "../contexts/FilterContext";
import { SlMagnifier } from "react-icons/sl";

const SearchField = () => {
  const searchFilter = useSearchFilter();
  const setSearchFilter = useSetSearchFilter();
  const placeholder = searchFilter ? searchFilter : "Search articles ...";

  return (
    <Box m={5}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <FormControl id="search">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SlMagnifier />
            </InputLeftElement>
            <Input
              type="text"
              name="username"
              placeholder={placeholder}
              value={searchFilter}
              onChange={(event) => setSearchFilter(event.target.value)}
            />
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  );
};

export default SearchField;
