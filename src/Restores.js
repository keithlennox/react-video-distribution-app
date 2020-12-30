import React, { useState, useContext, useMutation } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import Context from './Context';
import { useQuery } from '@apollo/client';
import { GET_RESTORES } from './GraphQL';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';

const Restores = () => {

  console.log('Restores component loaded');

  //Get state from context
  const {status, setStatus, editing, setEditing, platform, setPlatform, publishEnd, setPublishEnd, publishStart, setPublishStart, scheduleId, setScheduleId, asset, setAsset, collection, setCollection, users, setUsers} = useContext(Context);

  //Get Restores
  const { loading, error, data } = useQuery(GET_RESTORES, {
    fetchPolicy: 'network-only' //Forces Apollo to check db not cache
  });

  //Handle delay or error getting platforms
  if (loading) {return (<p>Loading...</p>)};
  if (error) {return (<p>Error</p>)};
  console.log(data.allRestores.nodes);

  const columns = [
    {
      Header: 'Video ID',
      accessor: 'videoId',
      minWidth: 50,
      style: {textAlign: 'center'},
    },
    {
      Header: 'Restore Job ID',
      accessor: 'restoreJobId',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Created',
      accessor: 'created',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Progress',
      accessor: 'progress',
      minWidth: 100,
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
      minWidth: 50,
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
        <h1>Restore</h1>
        <Form inline>
          <Label className="mr-sm-2">Filter: </Label>
          <Input name="filter" type="text" />
        </Form>
      </div>
      <ReactTable
        data={data.allRestores.nodes}
        columns={columns}
        defaultPageSize={60}
        sortable={true}
        className='-striped -highlight' />
    </>
  )
}

export default Restores;