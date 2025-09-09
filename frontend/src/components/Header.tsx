import React from 'react';
import {Flex, Heading, HoverCard, Portal, Stack, Text} from "@chakra-ui/react";
import {Toaster} from "./ui/toaster.tsx";
import {ColorModeButton} from "./ui/color-mode.tsx";
import {Link} from "react-router";
import useUser from "../hooks/useUser.tsx";
import StyledAvatar from "./StyledAvatar.tsx";

const Header = () => {
  const {user} = useUser();

  return (
    <Flex justifyContent="space-between" py='15px' px='15px' width='100%'>
      <ColorModeButton/>
      <Link to='/'>
        <Heading size="3xl">Bipki</Heading>
      </Link>

      {
        user?.role === 'admin' ?
          <Link to='/admin'>
            <Heading size="3xl">Admin</Heading>
          </Link> : <></>
      }

      <HoverCard.Root size="sm" disabled={!user}>
        <HoverCard.Trigger asChild>
          <Link to='/profile'>
            <StyledAvatar user={user}/>
          </Link>
        </HoverCard.Trigger>
        {
          user ?
            <Portal>
              <HoverCard.Positioner>
                <HoverCard.Content>
                  <HoverCard.Arrow/>
                  <Stack gap="4" direction="row">
                    <StyledAvatar user={user}/>
                    <Stack gap="1">
                      <Text textStyle="sm" fontWeight="semibold">
                        {user.username}
                      </Text>
                      <Text textStyle="sm" color="fg.muted">
                        Role: {user.role}
                      </Text>
                    </Stack>
                  </Stack>
                </HoverCard.Content>
              </HoverCard.Positioner>
            </Portal> :
            <></>
        }
      </HoverCard.Root>
      <Toaster/>
    </Flex>
  );
};

export default Header;