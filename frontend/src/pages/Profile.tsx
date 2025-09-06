import React from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import {logout} from "../api/auth";
import useUser from "../hooks/useUser";
import {useNavigate} from "react-router-dom";
import {useColorModeValue} from "../components/ui/color-mode.tsx";
import StyledAvatar from "../components/StyledAvatar.tsx";

const Profile = () => {
  const {removeUser, user} = useUser();
  const navigate = useNavigate();

  async function onClick() {
    await logout();
    removeUser();
    navigate("/login");
  }

  return (
    <Center py={10}>
      <Box
        maxW="sm"
        w="full"
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="lg"
        rounded="xl"
        p={8}
        textAlign="center"
      >
        <StyledAvatar user={user} mb={4} size="2xl"/>

        <Heading fontSize="2xl" fontWeight="bold">
          {user?.username || "Anonymous"}
        </Heading>

        <Text fontSize="sm" color="gray.500">
          {user?.role || "No role"}
        </Text>

        <Stack mt={8} gap={4}>
          <Button
            colorScheme="red"
            variant="solid"
            onClick={onClick}
          >
            Logout
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Profile;
