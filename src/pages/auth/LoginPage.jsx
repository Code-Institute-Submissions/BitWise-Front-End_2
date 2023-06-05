import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  useColorModeValue,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { useRedirect } from "../../hooks/useRedirect";

const LoginPage = () => {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginData;

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("dj-rest-auth/login/", loginData)
      .then((response) => {
        setCurrentUser(response.data.user);
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response?.data);
      });
  };

  return (
    <Flex
      minH={"100vh"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign="center" px={10}>
            Login to your account
          </Heading>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </FormControl>

              {errors.username?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </FormControl>

              {errors.password?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}

              <Button
                type="submit"
                bg={"purple.400"}
                color={"white"}
                _hover={{
                  bg: "purple.500",
                }}
              >
                Login
              </Button>

              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} status="warning">
                  <AlertIcon />
                  {message}
                </Alert>
              ))}
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
