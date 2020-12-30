/*
This page represents the concept of scheduling by template.
The basic concept is that each asset type associated with a video (PROGRAM, SEGMENT, CLIP, etc.) would have it's own
set of publish points. The process always starts with a user publishing content, but they don't have to select publish points.
They publish the PROGRAM only, selecting a start date and a scheduling_template. The scheduling_template contains
a list of publish points for each asset type. The code finds all the associated assets of the PROGRAM and adds them to the schedule table
with the appropriate publish point and start/end dates. The end date would be based on the info in the rights system,
such as 1st use date plus 30 days. Something like that.

In order to handle rights, the rights table should contain the following columns:

rights_start: 1st use. The start date is whenever the video is first published.
rights_end: + # of days. The end date is x number of days after the start date.
repeats: integer. The max # of times a video can be published).
concurrent: integer. The max number of shows from the same series that can be live at the same time.
*/

import React, { useState, useContext, useMutation } from 'react';
import Context from './Context';
import { Card, CardHeader, CardTitle, CardText, CardImg, CardImgOverlay, Row, Form, FormGroup, Label, Input, Button , Col} from 'reactstrap';
import { useQuery } from '@apollo/client';
import { GET_TEMPLATE } from './GraphQL';

const Template = () => {

  console.log('Series component loaded');

  //Get state from context
  const {status, setStatus, editing, setEditing, platform, setPlatform, publishEnd, setPublishEnd, publishStart, setPublishStart, scheduleId, setScheduleId, asset, setAsset, collection, setCollection, users, setUsers} = useContext(Context);

  // Use Apollo client useQuery hook to get rights from db
  const { loading, error, data } = useQuery(GET_TEMPLATE, {
    variables: { seriesId: asset.id },
    fetchPolicy: 'network-only' //Forces Apollo to check db not cache
  });
  if (loading) {return (<p>Loading...</p>)}
  if (error) {return (<p>Error</p>)}
  console.log(data.allTemplates.nodes);

  return (
    <>
      <div className="m-3">
        <p className="m-3"><h4>{asset.assetType}</h4>ID: {asset.id}<br/>Title: {asset.title}</p>
      </div>
      <Row className="m-3">
        <Col sm="4">
          <Card body className="shadow-lg">
            {data.allTemplates.nodes.map(
            item => {
              if(item.assetType === "PROGRAM") {
              return (
                <CardHeader>
                  <h5>{item.assetType}</h5>
                  Start: {item.start}<br/>
                  End: {item.end}<br/>
                  Repeats: {item.repeats}<br/>
                  Concurrent: {item.concurrent}<br/>
                  Geogate Territory: {item.geogateTerritory}<br/>
                  Geogate Filter: {item.geogateFilter}
                </CardHeader>
            )}})}
            <CardTitle></CardTitle>
            <CardText>
              <Form>
                <FormGroup check>
                  <Label check><Input checked type="checkbox" />{' '}Brightcove / tvo.org</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Brightcove / tvokids</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Brightcove / ILC</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}mPower</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Publicity / TVO</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Publicity / TVOKids</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input checked type="checkbox" />{' '}OmnyStudio / Agenda</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}OmnyStudio / On Docs</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}OmnyStudio / onpoli</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}OmnyStudio / TVO50</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}OmnyStudio / WordBomb</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}YouTube / Docs</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}YouTube / Preschool</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input checked type="checkbox" />{' '}YouTube / TAWSP</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}YouTube / TVOKids</Label>
                </FormGroup>
              </Form>
            </CardText>
            <Button>Save</Button>
          </Card>
        </Col>
        <Col sm="4">
          <Card body className="shadow-lg">
          {data.allTemplates.nodes.map(
            item => {
              if(item.assetType === "SEGMENT") {
              return (
                <CardHeader>
                  <h5>{item.assetType}</h5>
                  Start: {item.start}<br/>
                  End: {item.end}<br/>
                  Repeats: {item.repeats}<br/>
                  Concurrent: {item.concurrent}<br/>
                  Geogate Territory: {item.geogateTerritory}<br/>
                  Geogate Filter: {item.geogateFilter}
                </CardHeader>
            )}})}
          <CardTitle></CardTitle>
            <CardText>
            <Form>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Brightcove / tvo.org</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Brightcove / tvokids</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Brightcove / ILC</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}mPower</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Publicity / TVO</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Publicity / TVOKids</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}OmnyStudio / Agenda</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}OmnyStudio / On Docs</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input checked type="checkbox" />{' '}OmnyStudio / onpoli</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}OmnyStudio / TVO50</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}OmnyStudio / WordBomb</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}YouTube / Docs</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}YouTube / Preschool</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}YouTube / TAWSP</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}YouTube / TVOKids</Label>
                </FormGroup>
              </Form>
            </CardText>
            <Button>Save</Button>
          </Card>
        </Col>
        <Col sm="4">
          <Card body className="shadow-lg">
          {data.allTemplates.nodes.map(
            item => {
              if(item.assetType === "PROMO") {
              return (
                <CardHeader>
                  <h5>{item.assetType}</h5>
                  Start: {item.start}<br/>
                  End: {item.end}<br/>
                  Repeats: {item.repeats}<br/>
                  Concurrent: {item.concurrent}<br/>
                  Geogate Territory: {item.geogateTerritory}<br/>
                  Geogate Filter: {item.geogateFilter}
                </CardHeader>
            )}})}
            <CardTitle></CardTitle>
            <CardText>   
            <Form>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Brightcove / tvo.org</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Brightcove / tvokids</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Brightcove / ILC</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input checked type="checkbox" />{' '}mPower</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Publicity / TVO</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}Publicity / TVOKids</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}OmnyStudio / Agenda</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}OmnyStudio / On Docs</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input checked type="checkbox" />{' '}OmnyStudio / onpoli</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}OmnyStudio / TVO50</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}OmnyStudio / WordBomb</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}YouTube / Docs</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}YouTube / Preschool</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}YouTube / TAWSP</Label>
                </FormGroup>
                <FormGroup check>
                  <Label check><Input type="checkbox" />{' '}YouTube / TVOKids</Label>
                </FormGroup>
              </Form>
            </CardText>
            <Button>Save</Button>
          </Card>
        </Col>
      </Row>
    </>
  )

}

export default Template;