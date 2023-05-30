import { useCurrentUser } from "../contexts/CurrentUserContext";
import { HStack, Heading, Link, Avatar } from "@chakra-ui/react";

const LoggedIn = () => {
  const currentUser = useCurrentUser();
  return (
    <>
      {currentUser && (
        <HStack justifyContent="flex-start">
          <Link to={`/profiles/`}>
            <Avatar
              size="md"
              name={currentUser.profile_name}
              bg={"purple.500"}
              src={currentUser.profile_image}
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
