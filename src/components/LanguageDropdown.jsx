import {
  useLanguageFilter,
  useSetLanguageFilter,
} from "../contexts/FilterContext";
import { Select, Box, FormControl } from "@chakra-ui/react";
import languageOptions from "../constants/languageOptions";

const LanguageDropdown = () => {
  const languageFilter = useLanguageFilter();
  const setLanguageFilter = useSetLanguageFilter();

  const handleLanguageChange = (event) => {
    setLanguageFilter(event.target.value);
  };

  return (
    <Box mb={5} w={180}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <FormControl id="language">
          <Select
            placeholder="All Languages"
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
