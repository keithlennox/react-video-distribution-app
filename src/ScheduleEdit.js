import React, { useState, useContext } from 'react';
import 'react-table/react-table.css'
import Context from './Context';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SCHEDULE, UPDATE_SCHEDULE } from './GraphQL';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }
};

const ScheduleEdit = () => {

  console.log('ScheduleEdit component loaded');

  // Modal and date validation state
  const [modalIsOpen, setIsOpen] = useState(false);
  const [invalidDateError, setInvalidDateError] = useState(false);


  //Get state from context
  const {status, editing, setEditing, platform, setPlatform, publishEnd, setPublishEnd, publishStart, setPublishStart, scheduleId, setScheduleId, asset, setAsset, collection, setCollection, users, setUsers} = useContext(Context);

  //Update schedule
  const [updateButton, { loading, error }] = useMutation ( UPDATE_SCHEDULE, {
    variables: { scheduleId: scheduleId, publishStart: publishStart, publishEnd: publishEnd },
    refetchQueries: [{ query: GET_SCHEDULE,
      variables: { asset: asset.id } //not sure why i have to supply var
    }]
  });

  //Function to validate date
  const dateValidation = () => {
    if (publishStart > publishEnd) {
      setInvalidDateError(true)
      openModal();
      console.log('time error');
    } else {
      updateButton();
    }
  }

  //Modal functions to open / close based on state
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //Handle delay or error updating schedule
  if (loading) { return(<p>Loading...</p>) }
  if (error) { return(<p>Error</p>) }

  const cancelButton = () => {
    console.log('Cancel button was clicked');
    setPublishStart(null);
    setPublishEnd(null);
    setPlatform(null);
    setEditing(false);
  }

  /*See comments in ScheduleAdd.js for form validation rules */
  return (
    <Form className="m-3" inline>
      {(invalidDateError) // This is where modal triggers for Date Error
        ? <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Date Error Modal">
          <h2>Error With Dates Selected</h2>
          <div>An end date can't be before a start date, please pick new dates.</div>
          <button onClick={closeModal}>close</button>
        </Modal>
        : null}
      <FormGroup className="mx-2 mb-2 mr-sm-2 mb-sm-0">
        <Label className="mr-sm-2">Platform:</Label>
        <Input name="platform" disabled value={platform} type="text" />
      </FormGroup>
      <FormGroup className="mx-2 mb-2 mr-sm-2 mb-sm-0">
        <Label className="mr-sm-2">Start:</Label>
        <DatePicker
          disabled={ status != "Live" ? false : true }
          selected={publishStart}
          onChange={date => setPublishStart(date)}
          showTimeSelect
          showYearDropdown
          timeFormat="HH:mm"
          dateFormat="yyyy-MM-dd HH:mm"/>
      </FormGroup>
      <FormGroup className="mx-2 mb-2 mr-sm-2 mb-sm-0">
        <Label className="mr-sm-2">End:</Label>
        <DatePicker
          selected={publishEnd}
          onChange={date => setPublishEnd(date)}
          showTimeSelect
          showYearDropdown
          timeFormat="HH:mm"
          dateFormat="yyyy-MM-dd HH:mm"/>
      </FormGroup>
      <Button color="info" className="mx-2" onClick={dateValidation}>Update</Button>
        <Button color="info" className="mx-2" onClick={cancelButton}>Cancel</Button>
    </Form>
  )
}

export default ScheduleEdit;