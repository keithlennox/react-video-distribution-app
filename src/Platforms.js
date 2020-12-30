import React, { useState, useContext, useMutation } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Context from './Context';
import { useQuery } from '@apollo/client';
import { GET_PLATFORMS } from './GraphQL';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import PublishIcon from '@material-ui/icons/Publish';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const Platforms = () => {

  console.log('Platforms component loaded');

  //Get state from context
  const {status, setStatus, editing, setEditing, platform, setPlatform, publishEnd, setPublishEnd, publishStart, setPublishStart, scheduleId, setScheduleId, asset, setAsset, collection, setCollection, users, setUsers} = useContext(Context);

  //Get Platforms
  const { loading, error, data } = useQuery(GET_PLATFORMS, {
    fetchPolicy: 'network-only' //Forces Apollo to check db not cache
  });

  //Handle delay or error getting platforms
  if (loading) {return (<p>Loading...</p>)};
  if (error) {return (<p>Error</p>)};
  console.log(data.allPlatforms.nodes);

  const columns = [
    {
      Header: 'Platform',
      accessor: 'platform',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Encoder Workflow ID',
      accessor: 'encoderWorkflowId',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Account',
      accessor: 'account',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Group',
      accessor: 'grouping',
      minWidth: 50,
      style: {textAlign: 'center'},
    },
    {
      Header: 'CRUD Plugin',
      accessor: 'plugin',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      width: 90,
      Cell: row => (
        <>
          <DeleteIcon style={{ fontSize: 18 }} />
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
          <Label className="mr-sm-1">Platform:</Label>
          <Input type="text" name="username" id="username" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
          <Label  className="mr-sm-1" for="password">Encoder ID:</Label>
          <Input type="text" name="password" id="password" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
          <Label  className="mr-sm-1" for="email">Account:</Label>
          <Input type="text" name="email" id="email" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
          <Label  className="mr-sm-1" for="group">Group:</Label>
          <Input type="text" name="group" id="group" />
        </FormGroup>
        <CloudUploadIcon style={{ fontSize: 40 }} />
        <Button color="info" className="mx-3">Add</Button>
        <Button color="info" className="mx-2">Cancel</Button>
      </Form>
      <ReactTable
        data={data.allPlatforms.nodes}
        columns={columns}
        sortable={false}
        className='-striped -highlight' />
    </>
  )
}

export default Platforms;