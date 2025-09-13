import React from 'react';
import {Container, Switch} from "@chakra-ui/react";
import useToast from "../hooks/useToast.tsx";
import {askNotificationPermission} from "../utils/notifications.ts";
import {registerServiceWorker, subscribeNotifications, unregisterServiceWorker} from "../utils/pushNotifications.ts";
import {getNotificationKey, removeSubscription, sendSubscription} from "../api/notification.ts";
import NotificationForm from "./NotificationForm.tsx";

const NotificationSettings = () => {
  const {successToast, errorToast} = useToast();

  async function onCheckPush(checked: boolean) {
    if (checked) {
      askNotificationPermission()
      await registerServiceWorker()
      const rs = await getNotificationKey()
      if (!rs.data) {
        return errorToast(rs.error ?? '')
      }

      const sub = await subscribeNotifications(rs.data.key)
      const rs2 = await sendSubscription(sub)
      if (!rs2.data) {
        await unregisterServiceWorker()
        return errorToast(rs2.error ?? '')
      }

      successToast('Push notifications enabled')
    } else {
      await unregisterServiceWorker()
      const rs = await removeSubscription()
      if (!rs.data) {
        return errorToast(rs.error ?? '')
      }
    }
  }

  return (
    <Container>
      <Switch.Root size='lg' onCheckedChange={e => onCheckPush(e.checked)}>
        <Switch.HiddenInput/>
        <Switch.Control/>
        <Switch.Label>Enable push</Switch.Label>
      </Switch.Root>
      <NotificationForm/>
    </Container>
  );
};

export default NotificationSettings;