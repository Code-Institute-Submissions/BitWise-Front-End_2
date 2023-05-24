import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiTrash, BiEdit } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";

const ArticleCardUpdateButton = (props) => {
  const { handleEdit, handleDelete } = props;

  const custColor = useColorModeValue("#805AD5", "#D6BCFA");
  const custColorText = useColorModeValue("white", "black");

  return (
    <Menu>
      <MenuButton
        as={Button}
        _expanded={{ bg: custColor, color: custColorText }}
      >
        <BsThreeDotsVertical aria-label="See menu" />
      </MenuButton>
      <MenuList
        style={{
          position: "absolute",
          right: "-50px",
          left: "auto",
        }}
      >
        <MenuItem onClick={handleEdit} aria-label="edit">
          <BiEdit />
          <span>&nbsp;&nbsp;</span>Edit Article
        </MenuItem>
        <MenuItem onClick={handleDelete} aria-label="delete">
          <BiTrash />
          <span>&nbsp;&nbsp;</span>Delete Article
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ArticleCardUpdateButton;
