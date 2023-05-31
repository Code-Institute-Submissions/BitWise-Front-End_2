import {
  Card,
  HStack,
  Heading,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  CardHeader,
  CardFooter,
  Text,
  Flex,
  CardBody,
  Avatar,
} from "@chakra-ui/react";
import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { BiUserPlus, BiUserMinus, BiUserCheck } from "react-icons/bi";
import { useColorModeValue } from "@chakra-ui/react";

import useFollowProfile from "../hooks/useFollowProfile";
import { Link } from "react-router-dom";

const ProfileCard = (props) => {
  const {
    id,
    profile_name,
    following_id,
    followed_count,
    following_count,
    image,
    bio,
    article_count,
    languages_count,
  } = props;
  const currentUser = useCurrentUser();
  const custColor = useColorModeValue("#805AD5", "#D6BCFA");
  const iconCustColor = useColorModeValue("white", "black");
  const custFooterColor = useColorModeValue("#FAF5FF", "#4A5568");

  const { handleFollow, handleUnFollow } = useFollowProfile();

  return (
    <Card overflow="hidden">
      <CardHeader>
        <HStack justifyContent="space-between">
          <Link to={`/profile/${id}`}>
            <HStack>
              <Avatar name={profile_name} bg={"purple.500"} src={image} />
              {profile_name.length > 7 ? (
                <Heading size="sm">{profile_name.slice(0, 7)}...</Heading>
              ) : (
                <Heading size="sm">{profile_name}</Heading>
              )}
            </HStack>
          </Link>
          {id === currentUser?.profile_id ? (
            <Popover placement="top">
              <PopoverTrigger>
                <Button border="1px solid" borderColor={custColor}>
                  <BiUserCheck color={custColor} fontSize="100%" />
                </Button>
              </PopoverTrigger>
              <PopoverContent w="220px" marginLeft="-170px">
                <PopoverCloseButton />
                <PopoverHeader>Sorry...</PopoverHeader>
                <PopoverBody>Can't follow self</PopoverBody>
              </PopoverContent>
            </Popover>
          ) : following_id ? (
            <Button onClick={() => handleUnFollow(props)} bg={custColor}>
              <BiUserMinus color={iconCustColor} fontSize="100%" />
            </Button>
          ) : currentUser ? (
            <Button onClick={() => handleFollow(props)}>
              <BiUserPlus fontSize="100%" />
            </Button>
          ) : (
            <Popover placement="top">
              <PopoverTrigger>
                <Button>
                  <BiUserPlus fontSize="100%" />
                </Button>
              </PopoverTrigger>
              <PopoverContent w="220px" marginLeft="-170px">
                <PopoverCloseButton />
                <PopoverHeader>Sorry...</PopoverHeader>
                <PopoverBody>Login to follow</PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </HStack>
      </CardHeader>

      <Link to={`/profile/${id}`}>
        <CardBody h="140px">
          {bio ? (
            <>
              <Heading size="sm"> Bio:</Heading>
              {bio.length > 80 ? (
                <Text>{bio.slice(0, 80)}...</Text>
              ) : (
                <Text>{bio}</Text>
              )}
            </>
          ) : (
            <Heading size="sm"> No Bio for {profile_name} </Heading>
          )}
        </CardBody>

        <CardFooter justifyContent="space-evenly" bg={custFooterColor}>
          <Flex flexWrap="wrap" justifyContent="center">
            <Flex flexWrap="wrap" justifyContent="center">
              <Card fontSize="sm" m={1} p={1} minW="100px" alignItems="center">
                Following: {following_count}
              </Card>
              <Card fontSize="sm" m={1} p={1} minW="100px" alignItems="center">
                Followers: {followed_count}
              </Card>
            </Flex>

            <Flex flexWrap="wrap" justifyContent="center">
              <Card fontSize="sm" m={1} p={1} minW="100px" alignItems="center">
                Articles: {article_count}
              </Card>
              <Card fontSize="sm" m={1} p={1} minW="100px" alignItems="center">
                Languages: {languages_count}
              </Card>
            </Flex>
          </Flex>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProfileCard;
