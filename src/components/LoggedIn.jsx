import { useCurrentUser } from "../contexts/CurrentUserContext";
import { HStack, Heading, Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LoggedIn = () => {
  const currentUser = useCurrentUser();
  return (
    <>
      {currentUser && (
        <HStack justifyContent="flex-start">
          <Link to={`/profile/${currentUser.profile_id}`}>
            <Avatar
              size="md"
              name={currentUser.username}
              bg={"purple.500"}
              src={currentUser.profile_image}
              alt={currentUser.username}
            />
          </Link>
          <Heading pl={2} size="md">
            {currentUser.username.length > 10
              ? `${currentUser.username.slice(0, 10)}...`
              : `${currentUser.username}`}
          </Heading>
        </HStack>
      )}
    </>
  );
};

export default LoggedIn;
