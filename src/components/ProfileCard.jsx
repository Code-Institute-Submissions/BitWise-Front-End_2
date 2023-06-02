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
import { BiUserPlus, BiUserMinus } from "react-icons/bi";
import { useColorModeValue } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

import useFollowProfile from "../hooks/useFollowProfile";
import { Link, useNavigate } from "react-router-dom";

import UpdateDeleteButton from "./UpdateDeleteButton";

const ProfileCard = (props) => {
  const {
    id,
    owner,
    following_id,
    followed_count,
    following_count,
    image,
    bio,
    article_count,
    languages_count,
    main,
  } = props;
  const currentUser = useCurrentUser();
  const custColor = useColorModeValue("#805AD5", "#D6BCFA");
  const iconCustColor = useColorModeValue("white", "black");
  const custFooterColor = useColorModeValue("#FAF5FF", "#4A5568");

  const { handleFollow, handleUnFollow } = useFollowProfile();
  const navigate = useNavigate();

  const handleEdit = (profileId) => {
    navigate(`/profile/edit/${profileId}/`);
  };

  const handlePasswordUpdate = (profileId) => {
    navigate(`/profile/password/${profileId}/`);
  };

  return (
    <Card overflow="hidden">
      <CardHeader>
        <HStack justifyContent="space-between">
          <Link to={`/profile/${id}`}>
            <HStack>
              <Avatar name={owner} bg={"purple.500"} src={image} />
              {owner.length > 7 ? (
                <Heading size="sm">{owner.slice(0, 7)}...</Heading>
              ) : (
                <Heading size="sm">{owner}</Heading>
              )}
            </HStack>
          </Link>
          {id === currentUser?.profile_id ? (
            <UpdateDeleteButton
              icon={<BsThreeDotsVertical />}
              target={"Profile"}
              handleEdit={() => handleEdit(id)}
              handlePasswordUpdate={() => handlePasswordUpdate(id)}
              profileUpdate
            />
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
              {(bio.length > 80) & !main ? (
                <Text>{bio.slice(0, 80)}...</Text>
              ) : (
                <Text>{bio}</Text>
              )}
            </>
          ) : (
            <Heading size="sm"> No Bio for {owner} </Heading>
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
