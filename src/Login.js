import React, { useState, useContext } from 'react';
import { Form, FormGroup, Label, Input, Button , Col} from 'reactstrap';

const Login = () => {
  console.log('Login component loaded');
  
  //Handle user submit button
  const userSubmitButton = () => {
    console.log('User submit button was clicked');
  }

  //Handle user submit button
  const userCancelButton = () => {
    console.log('User cancel button was clicked');
  }

  return (
    <>
      <h1 className="m-3">Login</h1>
      <Col md={{ size: 3, offset: 4 }}>
        <Form className="m-4">
          <FormGroup>
            <Label for="title">Username</Label>
            <Input type="text" name="username" id="username" />
          </FormGroup>
          <FormGroup>
            <Label for="description">Password</Label>
            <Input type="text" name="password" id="password" />
          </FormGroup>
          <Button color="info" className="mx-5" onClick={userSubmitButton}>Submit</Button>
          <Button color="info" className="mx-1" onClick={userCancelButton}>Cancel</Button>
        </Form>
      </Col>
    </>
  )
}

export default Login;