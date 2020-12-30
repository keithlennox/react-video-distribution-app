import React, { useState, useContext } from 'react';
import ReactTable from 'react-table'
import SyncIcon from '@material-ui/icons/Sync';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import 'react-table/react-table.css'
import Context from './Context';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { GET_SCHEDULE, DELETE_SCHEDULE } from './GraphQL';
import "react-datepicker/dist/react-datepicker.css";
import ScheduleEdit from './ScheduleEdit';
import ScheduleAdd from './ScheduleAdd';

const Schedule = () => {

  console.log('Schedule component loaded');

  //Get state from context
  const {status, setStatus, editing, setEditing, platform, setPlatform, publishEnd, setPublishEnd, publishStart, setPublishStart, scheduleId, setScheduleId, asset, setAsset, collection, setCollection, users, setUsers} = useContext(Context);

  //Get schedule
  const { loading, error, data } = useQuery(GET_SCHEDULE, {
    variables: { asset: asset.id },
    fetchPolicy: 'network-only' //Forces Apollo to check db not cache
  });

  //Get schedule the lazy way (fires when refresh button clicked instead of on page load)
  const [getLazySchedule, { loading: lLoading, error: lError}] = useLazyQuery(GET_SCHEDULE, {
    variables: { asset: asset.id },
    fetchPolicy: 'network-only' //Forces Apollo to check db not cache
  });

  //Delete schedule
  const [deleteButton, { loading: dLoading, error: dError }] = useMutation ( DELETE_SCHEDULE, {
    refetchQueries: [{ query: GET_SCHEDULE,
      variables: { asset: asset.id } //not sure why i have to supply var
    }]
  } );

  //Handle delay or error getting schedule
  if (loading) {return (<p>Loading...</p>)};
  if (error) {return (<p>Error</p>)};

   //Handle delay or error getting lazy schedule
   //if (lLoading) {return (<p>Loading...</p>)};
   //if (lError) {return (<p>Error</p>)};
 
  //Handle delay or error deleting schedule
  if (dLoading) { return(<p>Loading...</p>) }
  if (dError) { return(<p>Error</p>) }

  //Handle click edit button
  const editButton = (row) => {
    console.log('Edit button was clicked');
    setScheduleId(row.scheduleId);
    console.log(row.scheduleId);
    setPlatform(row.platform);
    console.log(row.platform);
    setPublishStart(new Date(row.publishStart)); //DatePicker needs a date object
    console.log(row.publishStart);
    setPublishEnd(new Date(row.publishEnd));
    console.log(row.publishEnd);
    setStatus(row.status);
    console.log(row.status);
    setEditing(true);
  }

  const columns = [
    {
      accessor: 'scheduleId',
      show: false
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
      minWidth: 50,
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
    {
      Header: 'Actions',
      accessor: 'actions',
      width: 80,
      Cell: row => (
        row.original.status === 'Complete' 
        ? <span>&nbsp;</span> 
        : row.original.status === 'Error' 
        ? <><DeleteIcon style={{cursor: 'pointer'}} onClick={ () => { deleteButton({variables: { scheduleId: row.original.scheduleId }}) } }/></>
        : row.original.status === 'Live' 
        ? <><EditIcon style={{cursor: 'pointer'}} onClick={() => {editButton(row.original)}}  /></>
        : <><EditIcon style={{cursor: 'pointer'}} onClick={() => {editButton(row.original)}}/>&nbsp;&nbsp;<DeleteIcon style={{cursor: 'pointer'}} onClick={ () => { deleteButton({variables: { scheduleId: row.original.scheduleId }}) } }/></>
      ),
      style: { fontSize: 18, textAlign: 'center'}
    }
  ]

  return (
    <>
      <div className="m-3">
        <SyncIcon style={{cursor: 'pointer',  float: 'right'}} onClick={() => {getLazySchedule()}}  />
        <h1>Schedule</h1>
        <p>Asset type: {asset.assetType}<br/>ID: {asset.id}<br/>Series: {asset.series}<br/>Title: {asset.title}</p>
      </div>
      { editing ? <ScheduleEdit /> : <ScheduleAdd /> }
      <ReactTable
        data={data.allSchedules.nodes.map((item) => ({ //Flatten returned object because that's what ReactTable needs
          scheduleId: item.scheduleId,
          platform: item.platform,
          created: item.created + " (" + item.userByCreatedUserId.username + ")",
          updated: item.updated + " (" + item.userByUpdatedUserId.username + ")",
          status: item.status,
          publishStart: item.publishStart,
          publishEnd: item.publishEnd
        }))}
        columns={columns}
        sortable={true}
        className='-striped -highlight' />
    </>
  )
}

export default Schedule;