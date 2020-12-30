import React, { useState, useContext } from 'react';
import ReactTable from 'react-table'
import DeleteIcon from '@material-ui/icons/Delete';
import 'react-table/react-table.css'
import Context from './Context';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Collection = (props) => {
  console.log('Collection component loaded');

  const {collection} = useContext(Context);
 
  const scheduleClick = () => {
    console.log('Schedule clicked')
    return props.history.push("/schedule");
  };

  const historyClick = () => {
    console.log('Schedule clicked')
    return props.history.push("/history");
  };
  
  const collectionDeleteClick = () => {
    console.log('Delete schedule clicked')
  };

    const data = collection;
    const columns = [
      {
        Header: 'ID', 
        accessor: 'id',
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
        Header: 'Actions',
        accessor: 'actions',
        width: 100,
        Cell: row => (
          <>
            <DeleteIcon style={{ fontSize: 18 }} onClick={() => collectionDeleteClick()} />
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
          <h1>Collection</h1>
          <Form inline>
            <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
              <Label className="mr-sm-1" for="platform">Platform:</Label>
              <Input type="text" name="platform" id="platform" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
              <Label  className="mr-sm-1" for="start">Start:</Label>
              <Input type="text" name="start" id="start" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-3 mb-sm-0">
              <Label  className="mr-sm-1" for="end">End:</Label>
              <Input type="text" name="end" id="end" />
            </FormGroup>
            <Button color="info" className="mx-2">Submit</Button>
            <Button color="info" className="mx-2">Cancel</Button>
          </Form>
        </div>
        <ReactTable
          data={data}
          columns={columns}
          sortable={true}
          className='-striped -highlight'
        />
      </>
    )

}

export default Collection;