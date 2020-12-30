/*
We have created a dummy table in the vds database called videos, but eventually the data will come from the archive.
The archive is the single source of truth for archive metatadata.
*/

import React, { useContext } from 'react';
import ReactTable from 'react-table'
import EditIcon from '@material-ui/icons/Edit';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import 'react-table/react-table.css'
import Context from './Context';
import { useQuery, useMutation} from '@apollo/client';
import { GET_ASSETS, ADD_COLLECTION } from './GraphQL';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

//Create Assets functional component
const Assets = (props) => {
  console.log('Assets component loaded');

  //Get state from context
  const {setAsset} = useContext(Context);

  // Use Apollo client useQuery hook to get all assets from db
  const { loading, error, data } = useQuery(GET_ASSETS);
 
  //Use Apollo useMutation hook to add video to collection
  const [addCollection, { cLoading, cError }] = useMutation(ADD_COLLECTION);

  //Handle delay or error getting assets
  if (loading) {return (<p>Loading...</p>)}
  if (error) {return (<p>Error</p>)}

  //Handle delay or error adding collection
  if (cLoading) {return (<p>Loading...</p>)}
  if (cError) {return (<p>Error</p>)}

  //Handle schedule click
  const scheduleClick = (selectedAsset) => {
    setAsset(selectedAsset); //Puts the selected row object into State
    console.log('Asset button clicked');
    if(selectedAsset.assetType === "SERIES") {
      return props.history.push("/template");
    }else{
      return props.history.push("/schedule");
    }
  };

  //Handle collection click
  const collectionClick = (selectedAsset) => { //Recieves the selected table row
    console.log('Collection button clicked')
    addCollection({  variables: { videoId: selectedAsset.id, username: 'klennox' } }); //User is hard coded for now
  };

  const columns = [
    {
      Header: 'ID', 
      accessor: 'id',
      minWidth: 50,
      style: {textAlign: 'center'},
    },
    {
      Header: 'Asset Type',
      accessor: 'assetType',
      minWidth: 50,
      style: {textAlign: 'center'},
    },
    {
      Header: 'Series',
      accessor: 'series',
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
      Header: 'Keywords',
      accessor: 'keywords',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Created',
      accessor: 'created',
      style: {textAlign: 'center'},
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      width: 80,
      Cell: row => (
        <>
          <EditIcon style={{ fontSize: 18, cursor: 'pointer', textAlign: 'center' }} onClick={() => scheduleClick(row.original)} />
          &nbsp;&nbsp;&nbsp;
          <PlaylistAddIcon style={{ fontSize: 18, cursor: 'pointer', textAlign: 'center' }} onClick={() => collectionClick(row.original)} />
        </>
      )
    }
  ]

  return (
    <>
      <div className="m-3">
        <h1>Search</h1>
        <Form inline>
          <Label className="mr-sm-2">Search: </Label>
          <Input name="search" type="text" />
        </Form>
      </div>
      <ReactTable
        data={data.allVideos.nodes}
        columns={columns}
        sortable={true}
        defaultPageSize={100}
        className='-striped -highlight'
      />
    </>
  )

}

export default Assets;
