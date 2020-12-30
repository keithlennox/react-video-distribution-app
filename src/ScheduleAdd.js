import React, { useState, useContext } from 'react';
import 'react-table/react-table.css'
import Context from './Context';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SCHEDULE, ADD_SCHEDULE, GET_PLATFORMS } from './GraphQL';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-dropdown-select'; //reactstrap didn't have a good looking multi select drop down
import Modal from 'react-modal'; //reactstrap didn't have a good looking modal

// I can put this in className or in App.css, would also like to style better
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

const ScheduleAdd = () => {
  console.log('ScheduleAdd component loaded');

  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  // Look more into this
  Modal.setAppElement('body')

  
  //Create local state for use only in this component
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [invalidDateError, setInvalidDateError] = useState(false);

  //Get state from context
  const {platform, setPlatform, publishEnd, setPublishEnd, publishStart, setPublishStart, scheduleId, setScheduleId, asset, setAsset, collection, setCollection, currentUser, setCurrentUser, users, setUsers} = useContext(Context);

  //Get Platforms
  const { loading: pLoading, error: pError, data: pData } = useQuery(GET_PLATFORMS, {
    fetchPolicy: 'network-only' //Forces Apollo to check db not cache
  });

  //Add schedule
  const [addSchedule, { loading, error }] = useMutation ( ADD_SCHEDULE, {
    variables: { videoId: asset.id, created: new Date(), createdUserId: currentUser, updated: new Date(), updatedUserId: currentUser, status: "Requested", platform: platform, publishStart: publishStart, publishEnd: publishEnd },
    refetchQueries: [{ query: GET_SCHEDULE,
      variables: { asset: asset.id }
    }]
  });

  //Handle delay or error getting platforms
  if (pLoading) {return (<p>Loading...</p>)};
  if (pError) {return (<p>Error</p>)};
  console.log(pData.allPlatforms.nodes);
 
  //Handle delay or error adding schedule
  if (loading) { return(<p>Loading...</p>) }
  if (error) { return(<p>Error</p>) }

  //Handle the display inside the platforms input field
  const customContentRenderer = () => {
    return <div>Selected {selectedPlatforms.length} out of {pData.allPlatforms.nodes.length}</div>
  }

  //Handle cancel button click
  const cancelButton = () => {
    console.log('Cancel button was clicked');
    setPublishStart(null);
    setPublishEnd(null);
  }
console.log(selectedPlatforms);
  //Handle add button click
  const addButton = () => {
    if (publishStart > publishEnd) {
      setInvalidDateError(true)
      openModal();
      console.log('time error');
    } else {
      selectedPlatforms.forEach((item) => { //Calls db 3 times. Should find a way to call db only once.
        let platform = item.value;
        addSchedule({  variables: { videoId: asset.id, created: new Date(), createdUserId: currentUser, updated: new Date(), updatedUserId: currentUser, status: "Requested", platform: platform, publishStart: publishStart, publishEnd: publishEnd } });
      })
    }
  }
  //Modal functions to open/ close based on state
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  /*The submit form will need to check a few of things:
  The start date cannot be in the past - complete.
  The end date cannot come before the start date - complete.
  The start and end dates cannot overlap an existing entry in the Schedules table.
  The start and end date must be within the rights period. The rights period might have to be calculated. For example, 1st use plus X number of days.
  The drop down list should allow selection of multiple publish points - complete, but confirm we are using best component
  Users should be able to scroll years, not just months, in the date fields. - complete
  Prevent creation of schedule if max uses for a video has been reached. Max uses should be stored in video table.
  The above checks need to be done in ScheduleEdit.js as well.*/
  return (
    <Form className="m-3" inline>
      {(invalidDateError) // This is where modal triggers for Date Error
        ? <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Date Error Modal">
          <h2>Error With Dates Selected</h2>
          <div>An end date can't be before a start date, please pick new dates.</div>
          <button onClick={closeModal}>close</button>
        </Modal>
        : null}
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
      <Label className="mr-sm-2">Platform:</Label>
        <Select
          multi
          style={{width: 270}}
          color="#17a2b8;"
          contentRenderer={customContentRenderer}
          onChange={(value) => setSelectedPlatforms(value)}
          options={
            pData.allPlatforms.nodes.map(value => {
              return {label: value.platform, value: value.platform}
            }) 
          }
        />
      </FormGroup>
      <FormGroup className="mx-2 mb-2 mr-sm-2 mb-sm-0">
        <Label className="mr-sm-2">Start:</Label>
        <DatePicker
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
        <Button color="info" className="mx-2" onClick={addButton}>Add</Button>
        <Button color="info" className="mx-2" onClick={cancelButton}>Cancel</Button>
    </Form>
  )
}

export default ScheduleAdd;