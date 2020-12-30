import React, { useState, useContext } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Context from './Context';
import { useQuery, useMutation } from '@apollo/client';
import { GET_INSTANCES } from './GraphQL';
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Label, Input, Button , Col, Row} from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';

const Instance = (props) => {
  console.log('Publish component rendered');

  //Get state from context
  const {instanceEditing, setInstanceEditing, status, setStatus, editing, setEditing, platform, setPlatform, publishEnd, setPublishEnd, publishStart, setPublishStart, scheduleId, setScheduleId, asset, setAsset, collection, setCollection, users, setUsers} = useContext(Context);

  //Get metadata
  const { loading, error, data } = useQuery(GET_INSTANCES, {
    fetchPolicy: 'network-only' //Forces Apollo to check db not cache
  });

  //Handle delay or error getting instances
  if (loading) {return (<p>Loading...</p>)};
  if (error) {return (<p>Error</p>)};
  console.log(data.allInstances.nodes);

  const columns = [
    {
      Header: 'Video ID',
      accessor: 'videoId',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Platform',
      accessor: 'platform',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Created',
      accessor: 'created',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Title',
      accessor: 'title',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Description',
      accessor: 'description',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Encoder Job ID',
      accessor: 'encoderJobId',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Instance Job ID',
      accessor: 'instanceJobId',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Progress',
      accessor: 'progress',
      minWidth: 260,
      Cell: row => (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#dadada',
            borderRadius: '2px'
          }}
        >
          <div
            style={{
              width: row.value + "%",
              height: '100%',
              backgroundColor: '#17a2b8',
              borderRadius: '2px',
              transition: 'all .2s ease-out'
            }}
          />
        </div>
      )
    },
    {
      Header: 'Status',
      accessor: 'status',
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
      <div className="m-3">
        <h1>Publish</h1>
          <Form inline>
            <Label className="mr-sm-2">Filter: </Label>
            <Input name="filter" type="text" />
          </Form>
        </div>
      <ReactTable
        data={data.allInstances.nodes}
        columns={columns}
        defaultPageSize={60}
        sortable={true}
        className='-striped -highlight' />
    </>
  )
}

export default Instance;