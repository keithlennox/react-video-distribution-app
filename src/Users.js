import React, { useState, useContext } from 'react';
import ReactTable from 'react-table'
import DeleteIcon from '@material-ui/icons/Delete';
import 'react-table/react-table.css'
import Context from './Context';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Users = () => {
  console.log('Users component loaded');
 
  const {users} = useContext(Context);

  const handleEditClick = value => console.log('Edit ' + value);
  const handleDeleteClick = value => console.log('Delete ' + value);
  
    const data = users;
    const columns = [
    {
      Header: 'Username',
      accessor: 'username',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Password',
      accessor: 'password',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Email',
      accessor: 'email',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Group',
      accessor: 'group',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Role',
      accessor: 'role',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      width: 90,
      Cell: row => (
        <>
          <DeleteIcon style={{ fontSize: 18 }} onClick={() => handleDeleteClick()} />
        </>
      ),
      style: {
        cursor: 'pointer', 
        textAlign: 'center'
      }
    }
  ]

  return (
    <>
      <Form className="m-3" inline>
        <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
          <Label className="mr-sm-1">Username:</Label>
          <Input type="text" name="username" id="username" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
          <Label  className="mr-sm-1" for="password">Password:</Label>
          <Input type="text" name="password" id="password" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
          <Label  className="mr-sm-1" for="email">Email:</Label>
          <Input type="text" name="email" id="email" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
          <Label  className="mr-sm-1" for="group">Group:</Label>
          <Input type="text" name="group" id="group" />
        </FormGroup>
        <Button color="info" className="mx-2">Add</Button>
        <Button color="info" className="mx-2">Cancel</Button>
      </Form>
      <ReactTable
        data={data}
        columns={columns}
        sortable={true}
        className='-striped -highlight'
      />
    </>
  )

}

export default Users;