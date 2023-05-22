import {
  useLanguageFilter,
  useSetLanguageFilter,
} from "../contexts/FilterContext";
import { Select, Box, FormControl } from "@chakra-ui/react";
import languageOptions from "../constants/languageOptions";
import { useMediaQuery } from "react-responsive";

const LanguageDropdown = () => {
  const languageFilter = useLanguageFilter();
  const setLanguageFilter = useSetLanguageFilter();

  const handleLanguageChange = (event) => {
    setLanguageFilter(event.target.value);
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 600 });

  return (
    <Box mb={5} w={isSmallScreen ? 140 : 155}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <FormControl id="language">
          <Select
            placeholder={isSmallScreen ? "All" : "All Languages"}
            onChange={handleLanguageChange}
            value={languageFilter}
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FormControl>
      </form>
    </Box>
  );
};

export default LanguageDropdown;
