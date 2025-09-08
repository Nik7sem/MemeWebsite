import React, {useEffect, useState} from 'react';
import {Button, Field, HStack, Menu, NumberInput, Portal, Separator, Table, Text, VStack} from "@chakra-ui/react";
import {deleteUser, getUsers, updateUser} from "../api/users.ts";
import {LuChevronRight} from "react-icons/lu";
import StyledAvatar from "../components/StyledAvatar.tsx";
import useToast from "../hooks/useToast.tsx";
import {clearCanvas, setCanvasSize} from "../api/canvas.ts";

const AdminPage = () => {
  const [users, setUsers] = useState<{ id: number, username: string, role: string }[]>([]);
  const [size, setSize] = useState<{ rows: number, cols: number }>({rows: 100, cols: 100});
  const {errorToast} = useToast();

  useEffect(() => {
    getUsers().then((rs) => {
      if (rs.data) {
        setUsers(rs.data.users);
      }
    });
  }, []);

  function onSelectAction(id: number, action: string) {
    if (action === "delete") {
      deleteUser(id).then((rs) => {
          if (rs.data) {
            setUsers(users => users.filter(user => user.id !== id));
          } else {
            errorToast(rs.error ?? '')
          }
        }
      )
    }
  }

  function onSelectRole(username: string, role: string) {
    updateUser(username, role).then((rs) => {
        if (rs.data) {
          setUsers(users => users.map((user) => user.username === username ? {...user, role} : user));
        } else {
          errorToast(rs.error ?? '')
        }
      }
    )
  }

  return (
    <VStack>
      <Text fontSize='3xl' mt='10px'>Users</Text>
      <Table.Root size="lg" mt='10px' striped showColumnBorder width='fit-content'>
        <Table.ColumnGroup>
          <Table.Column htmlWidth="15%"/>
          <Table.Column htmlWidth="15%"/>
          <Table.Column htmlWidth="25%"/>
          <Table.Column htmlWidth="25%"/>
          <Table.Column htmlWidth="20%"/>
          <Table.Column/>
        </Table.ColumnGroup>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader textAlign='center'>Avatar</Table.ColumnHeader>
            <Table.ColumnHeader textAlign='center'>Id</Table.ColumnHeader>
            <Table.ColumnHeader>Username</Table.ColumnHeader>
            <Table.ColumnHeader>Role</Table.ColumnHeader>
            <Table.ColumnHeader textAlign='center'>Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell textAlign='center'><StyledAvatar user={item}/></Table.Cell>
              <Table.Cell textAlign='center'>{item.id}</Table.Cell>
              <Table.Cell>{item.username}</Table.Cell>
              <Table.Cell>{item.role}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Menu.Root onSelect={({value}) => onSelectAction(item.id, value)}>
                  <Menu.Trigger asChild>
                    <Button variant="outline" size="sm">
                      Open
                    </Button>
                  </Menu.Trigger>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Item value="delete">Delete</Menu.Item>
                        <Menu.Root positioning={{placement: "right-start", gutter: 2}}
                                   onSelect={({value}) => onSelectRole(item.username, value)}>
                          <Menu.TriggerItem>
                            Role <LuChevronRight/>
                          </Menu.TriggerItem>
                          <Portal>
                            <Menu.Positioner>
                              <Menu.Content>
                                <Menu.Item value="admin">Admin</Menu.Item>
                                <Menu.Item value="user">User</Menu.Item>
                              </Menu.Content>
                            </Menu.Positioner>
                          </Portal>
                        </Menu.Root>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Separator size='lg'/>
      <Text fontSize='3xl' mt='10px'>Canvas</Text>
      <Button onClick={() => clearCanvas()}>Clear canvas</Button>
      <HStack>
        <Field.Root>
          <Field.Label>Rows</Field.Label>
          <NumberInput.Root value={size.rows.toString()}
                            onValueChange={(e) => setSize({...size, rows: parseInt(e.value)})} width="200px">
            <NumberInput.Control/>
            <NumberInput.Input/>
          </NumberInput.Root>
          <Field.ErrorText>The entry is invalid</Field.ErrorText>
        </Field.Root>
        <Field.Root>
          <Field.Label>Cols</Field.Label>
          <NumberInput.Root value={size.cols.toString()}
                            onValueChange={(e) => setSize({...size, cols: parseInt(e.value)})} width="200px">
            <NumberInput.Control/>
            <NumberInput.Input/>
          </NumberInput.Root>
          <Field.ErrorText>The entry is invalid</Field.ErrorText>
        </Field.Root>
      </HStack>
      <Button onClick={() => setCanvasSize(size)}>Set size</Button>
    </VStack>
  );
};

export default AdminPage;