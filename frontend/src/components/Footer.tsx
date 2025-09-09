import React from 'react';
import {Badge, Em, Flex} from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex width='100%' position='absolute' bottom='30px' justifyContent='center' alignItems='center' flexDirection='column'>
      <Badge>Copyright © 2025 BiPKI services bipki.ddns.net <Em>All rights reserved</Em></Badge>
    </Flex>
  );
};

export default Footer;