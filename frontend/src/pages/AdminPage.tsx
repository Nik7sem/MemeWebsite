import React from 'react';
import {Separator, Text, VStack} from "@chakra-ui/react";
import VersionText from "../components/VersionText.tsx";
import UsersTable from "../components/UsersTable.tsx";
import CanvasSettings from "../components/CanvasSettings.tsx";
import NotificationSettings from "../components/NotificationSettings.tsx";

const AdminPage = () => {
  return (
    <VStack>
      <Text fontSize='3xl' mt='10px'>Users</Text>
      <UsersTable/>
      <Separator size='lg'/>
      <Text fontSize='3xl' mt='10px'>Canvas</Text>
      <CanvasSettings/>
      <Separator size='lg'/>
      <Text fontSize='3xl' mt='10px'>Notifications</Text>
      <NotificationSettings/>
      <VersionText/>
    </VStack>
  );
};

export default AdminPage;