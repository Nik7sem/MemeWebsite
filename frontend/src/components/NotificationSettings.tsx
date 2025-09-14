import React from 'react';
import {Container, Switch} from "@chakra-ui/react";
import useToast from "../hooks/useToast.tsx";
import {askNotificationPermission} from "../utils/notifications.ts";
import {registerServiceWorker, subscribeNotifications, unregisterServiceWorker} from "../utils/pushNotifications.ts";
import {getNotificationKey, removeSubscription, sendSubscription} from "../api/notification.ts";
import NotificationForm from "./NotificationForm.tsx";
import useUserData from "../hooks/useUserData.tsx";


const NotificationSettings = () => {
  const {successToast, errorToast} = useToast();
  const {setUserData, userData} = useUserData()

  async function unSubscribe() {
    await unregisterServiceWorker()
    const rs = await removeSubscription()
    if (!rs.data) {
      errorToast(rs.error ?? '')
      return true
    }
    return false
  }

  async function onCheckPush(checked: boolean) {
    if (checked) {
      await unSubscribe()

      askNotificationPermission()
      await registerServiceWorker()
      const rs = await getNotificationKey()
      if (!rs.data) {
        return errorToast(rs.error ?? '')
      }

      const sub = await subscribeNotifications(rs.data.key)
      const rs2 = await sendSubscription(sub)
      if (!rs2.data) {
        await unSubscribe()
        return errorToast(rs2.error ?? '')
      }

      successToast('Push notifications enabled')
    } else {
      if (await unSubscribe()) return
      successToast('Push notifications disabled')
    }
    setUserData({...userData, push: checked})
  }

  return (
    <Container>
      <Switch.Root size='lg' defaultChecked={userData.push} onCheckedChange={e => onCheckPush(e.checked)}>
        <Switch.HiddenInput/>
        <Switch.Control/>
        <Switch.Label>Enable push</Switch.Label>
      </Switch.Root>
      <NotificationForm/>
    </Container>
  );
};

export default NotificationSettings;