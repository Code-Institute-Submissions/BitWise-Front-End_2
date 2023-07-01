import { useOrderFilter, useSetOrderFilter } from "../contexts/FilterContext";
import { Select, Box, FormControl } from "@chakra-ui/react";
import { useMediaQuery } from "react-responsive";

const OrderDropdown = () => {
  const orderFilter = useOrderFilter();
  const setOrderFilter = useSetOrderFilter();

  const handleOrderChange = (event) => {
    setOrderFilter(event.target.value);
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 600 });

  return (
    <Box mx={5} w={isSmallScreen ? 100 : 155}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <FormControl id="orderFilter">
          <Select
            placeholder={isSmallScreen ? "Posted" : "Date Posted"}
            onChange={handleOrderChange}
            value={orderFilter}
            aria-label="Select Order"
          >
            <option value="-likes_count">
              {isSmallScreen ? "Liked" : "Most Liked"}
            </option>
            <option value="-comments_count">
              {isSmallScreen ? "Commented" : "Most Commented"}
            </option>
          </Select>
        </FormControl>
      </form>
    </Box>
  );
};

export default OrderDropdown;
