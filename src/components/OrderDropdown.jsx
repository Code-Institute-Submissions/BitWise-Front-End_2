import { useOrderFilter, useSetOrderFilter } from "../contexts/FilterContext";
import { Select, Box, FormControl } from "@chakra-ui/react";

const OrderDropdown = () => {
  const orderFilter = useOrderFilter();
  const setOrderFilter = useSetOrderFilter();

  const handleOrderChange = (event) => {
    setOrderFilter(event.target.value);
  };

  return (
    <Box m={5} w={180}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <FormControl id="language">
          <Select
            placeholder="Date Posted"
            onChange={handleOrderChange}
            value={orderFilter}
          >
            <option value="-likes_count">Most Liked</option>
            <option value="-comments_count">Most Comments</option>
          </Select>
        </FormControl>
      </form>
    </Box>
  );
};

export default OrderDropdown;
