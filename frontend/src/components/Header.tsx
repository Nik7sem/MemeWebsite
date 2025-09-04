import React from 'react';
import {Avatar, Flex, Heading} from "@chakra-ui/react";
import {Toaster} from "./ui/toaster.tsx";
import {ColorModeButton} from "./ui/color-mode.tsx";

const Header = () => {
  return (
    <Flex justifyContent="space-between" py='15px' px='15px'>
      <ColorModeButton/>
      <Heading size="3xl">Bipki</Heading>
      <Avatar.Root>
        {/*<Avatar.Fallback name="Segun Adebayo"/>*/}
        <Avatar.Fallback/>
        {/*<Avatar.Image src="https://bit.ly/sage-adebayo"/>*/}
      </Avatar.Root>
      <Toaster/>
    </Flex>
  );
};

export default Header;