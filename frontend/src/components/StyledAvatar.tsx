import React, {type FC} from 'react';
import {Avatar, type AvatarRootProps} from "@chakra-ui/react";
import type {User} from "../types/user.ts";

interface Props extends AvatarRootProps {
  user: User | null
}

const StyledAvatar: FC<Props> = ({user, ...props}) => {
  return (
    <Avatar.Root {...props} bg={user?.role === 'admin' ? "red.500" : "blue.500"}>
      <Avatar.Fallback name={user ? user.username : ''}/>
      {/*<Avatar.Image src="https://bit.ly/sage-adebayo"/>*/}
    </Avatar.Root>
  );
};

export default StyledAvatar;