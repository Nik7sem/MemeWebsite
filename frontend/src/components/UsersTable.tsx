import React, {useEffect, useState} from 'react';
import {Button, Menu, Portal, Table} from "@chakra-ui/react";
import StyledAvatar from "./StyledAvatar.tsx";
import {LuChevronRight} from "react-icons/lu";
import {deleteUser, getUsers, updateUser} from "../api/users.ts";
import useToast from "../hooks/useToast.tsx";

const UsersTable = () => {
  const [users, setUsers] = useState<{ id: number, username: string, role: string }[]>([]);
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
            <Table.Cell textAlign='center'><StyledAvatar m='4px' user={item}/></Table.Cell>
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
  );
};

export default UsersTable;