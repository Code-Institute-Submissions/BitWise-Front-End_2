import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiTrash, BiEdit } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";

const UpdateDeleteButton = (props) => {
  const {
    handleEdit,
    handleDelete,
    handlePasswordUpdate,
    icon,
    target,
    profileUpdate,
  } = props;

  const custColor = useColorModeValue("#805AD5", "#D6BCFA");
  const custColorText = useColorModeValue("white", "black");

  return (
    <Menu>
      <MenuButton
        as={Button}
        _expanded={{ bg: custColor, color: custColorText }}
        aria-label={`Options for ${target}`}
      >
        {icon}
      </MenuButton>
      <MenuList
        style={{
          position: "absolute",
          right: "-50px",
          left: "auto",
        }}
      >
        <MenuItem onClick={handleEdit} aria-label={`Edit ${target}`}>
          <BiEdit />
          <span>&nbsp;&nbsp;</span>Edit {target}
        </MenuItem>
        {profileUpdate ? (
          <MenuItem onClick={handlePasswordUpdate} aria-label="Update password">
            <RiLockPasswordLine />
            <span>&nbsp;&nbsp;</span>Update Password
          </MenuItem>
        ) : (
          <MenuItem onClick={handleDelete} aria-label={`Delete ${target}`}>
            <BiTrash />
            <span>&nbsp;&nbsp;</span>Delete {target}
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default UpdateDeleteButton;
