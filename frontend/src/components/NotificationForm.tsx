import React, {useState, type KeyboardEvent} from 'react';
import {Button, Field, Fieldset, Flex, Input, Stack} from "@chakra-ui/react";
import {sendNotification} from "../api/notification.ts";

const NotificationForm = () => {
  const [userId, setUserId] = useState<number>();
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();
  const [error, setError] = useState("");

  function validate() {
    if (!userId) {
      setError("User id is required");
    } else if (!title) {
      setError("Title is required");
    } else if (!body) {
      setError("Body is required");
    } else {
      return {userId, title, body}
    }
    return
  }

  function keyDownHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onClick().then()
    }
  }

  async function onClick() {
    const data = validate();
    if (!data) return

    const rs = await sendNotification(data);
    if (!rs.data) {
      setError(rs.error ?? "")
    }
  }

  return (
    <Flex width='full' mt='10px' justifyContent='center' alignItems='center'>
      <Fieldset.Root size="lg" maxW="md" border='solid 1px #27272a' borderRadius='2xl' p='40px' invalid={!!error}>
        <Stack>
          <Fieldset.Legend>Notification</Fieldset.Legend>
          <Fieldset.HelperText>
            Please provide notification Details below.
          </Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>
          <Field.Root>
            <Field.Label>User id (number)</Field.Label>
            <Input name="userId" type="number" onChange={(e) => setUserId(parseInt(e.target.value))}/>
          </Field.Root>

          <Field.Root>
            <Field.Label>title</Field.Label>
            <Input name="title" type="text" onChange={(e) => setTitle(e.target.value)}/>
          </Field.Root>

          <Field.Root>
            <Field.Label>body</Field.Label>
            <Input name="body" type="text" onChange={(e) => setBody(e.target.value)}
                   onKeyDown={keyDownHandler}/>
          </Field.Root>
        </Fieldset.Content>

        <Fieldset.HelperText>
          ХЗ ЧТО ЗДЕСЬ ПИСАТЬ
        </Fieldset.HelperText>

        <Button type="submit" alignSelf="flex-start" onClick={() => onClick()}>
          Submit
        </Button>

        <Fieldset.ErrorText>
          {error}
        </Fieldset.ErrorText>
      </Fieldset.Root>
    </Flex>
  );
};

export default NotificationForm;