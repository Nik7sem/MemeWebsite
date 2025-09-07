import React, {type FC} from 'react';
import {Spinner, VStack, Text, type SpinnerProps} from "@chakra-ui/react";

const Loader: FC<SpinnerProps> = ({...props}) => {
  return (
    <VStack colorPalette="teal" width='full' mt='50px' alignItems='center'>
      <Spinner size='xl' color="colorPalette.600" {...props}/>
      <Text color={props.color ? props.color : "colorPalette.600"}>Loading...</Text>
    </VStack>
  )
}

export default Loader;