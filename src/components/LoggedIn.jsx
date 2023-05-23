import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Heading } from "@chakra-ui/react";

const LoggedIn = () => {
  const currentUser = useCurrentUser();
  return (
    <>
      {currentUser && (
        <Heading size="md" pl={5} pt={5}>
          Logged in as {currentUser.username}
        </Heading>
      )}
    </>
  );
};

export default LoggedIn;
