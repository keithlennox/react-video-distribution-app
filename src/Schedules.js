import React, { useState, useContext } from 'react';
import ReactTable from 'react-table'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import 'react-table/react-table.css'
import Context from './Context';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SCHEDULES } from './GraphQL';
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Schedules = () => {

  console.log('Orders component loaded');

  //Get state from context
  const {status, setStatus, editing, setEditing, platform, setPlatform, publishEnd, setPublishEnd, publishStart, setPublishStart, scheduleId, setScheduleId, asset, setAsset, collection, setCollection, users, setUsers} = useContext(Context);

  //Get schedules
  const { loading, error, data } = useQuery(GET_SCHEDULES, {
    fetchPolicy: 'network-only' //Forces Apollo to check db not cache
  });

  //Handle delay or error getting schedules
  if (loading) {return (<p>Loading...</p>)};
  if (error) {return (<p>Error</p>)};
  console.log(data.allSchedules.nodes);

  const columns = [
    {
      accessor: 'scheduleId',
      show: false
    },
    {
      Header: 'Video ID',
      accessor: 'videoId',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Title',
      accessor: 'title',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Series',
      accessor: 'series',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Created',
      accessor: 'created',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Updated',
      accessor: 'updated',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Status',
      accessor: 'status',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Platform',
      accessor: 'platform',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Start',
      accessor: 'publishStart',
      style: {textAlign: 'center'},
    },
    {
      Header: 'End',
      accessor: 'publishEnd',
      style: {textAlign: 'center'},
    },
  ]

  return (
    <>
      <div className="m-3">
          <h1>Schedule</h1>
          <Form inline>
            <Label className="mr-sm-2">Filter: </Label>
            <Input name="filter" type="text" />
          </Form>
        </div>
        <ReactTable
          data={data.allSchedules.nodes.map((item) => ({ //Flatten returned object because that's what ReactTable needs
            videoId: item.videoId,
            title: item.videoByVideoId.title,
            series: item.videoByVideoId.series,
            scheduleId: item.scheduleId,
            platform: item.platform,
            created: item.created + " (" + item.userByCreatedUserId.username + ")",
            updated: item.updated + " (" + item.userByUpdatedUserId.username + ")",
            status: item.status,
            publishStart: item.publishStart,
            publishEnd: item.publishEnd,
          }))}
          columns={columns}
          sortable={true}
          defaultPageSize={60}
          className='-striped -highlight' />
    </>
  )
}

export default Schedules;