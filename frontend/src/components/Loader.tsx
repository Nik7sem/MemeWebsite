import React from 'react';
import {Spinner, VStack, Text} from "@chakra-ui/react";

const Loader = () => {
  return (
    <VStack colorPalette="teal" width='full' mt='50px' alignItems='center'>
      <Spinner size='xl' color="colorPalette.600"/>
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  )
}

export default Loader;