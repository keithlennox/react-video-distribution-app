import React from 'react';
import { Card, CardHeader, CardTitle, CardText, CardImg, CardImgOverlay, Row, Col, Button } from 'reactstrap';

const Dashboard = () => {
  console.log('Dashboard component loaded');
  
  return (
    <>
      <div className="m-3">
        <h1>Dashboard</h1>
      </div>
      <Row className="m-3">
        <Col sm="4">
          <Card body className="shadow-lg">
          <CardHeader className="font-weight-bold">My Recent Orders</CardHeader>
          <CardTitle></CardTitle>
            <CardText>
              <ul>
            <li>2020-07-21 22:34</li>
            <li>2020-07-21 22:34</li>
            <li>2020-07-21 22:34</li>
            <li>2020-07-21 22:34</li>
            <li>2020-07-21 22:34</li>
            </ul>
            </CardText>
            <Button>Export CSV</Button>
          </Card>
        </Col>
        <Col sm="4">
          <Card body className="shadow-lg">
          <CardHeader className="font-weight-bold">All Recent Orders</CardHeader>
          <CardTitle></CardTitle>
            <CardText>
              <ul>
            <li>2020-07-21 22:34 - gcraven</li>
            <li>2020-07-21 22:34 - michael</li>
            <li>2020-07-21 22:34 - klennox</li>
            <li>2020-07-21 22:34 - klennox</li>
            <li>2020-07-21 22:34 - gcraven</li>
            </ul>
            </CardText>
            <Button>Export CSV</Button>
          </Card>
        </Col>
        <Col sm="4">
          <Card body className="shadow-lg">
          <CardHeader className="font-weight-bold">Total hours published this week by publish point</CardHeader>
            <CardTitle></CardTitle>
            <CardText>    <ul>
            <li>Brightcove / tvo.org: 21</li>
            <li>Brightcove / tvo.org: 45</li>
            <li>Brightcove / ILC: 19</li>
            <li>OmnyStudio / Agenda: 4</li>
            </ul></CardText>
            <Button>Export CSV</Button>
          </Card>
        </Col>
      </Row>
      <Row className="m-3">
        <Col sm="4">
          <Card body className="shadow-lg">
            <CardHeader className="font-weight-bold">Currently logged in</CardHeader>
            <CardTitle></CardTitle>
            <CardText>    <ul>
            <li>klennox</li>
            <li>gcraven</li>
            <li>creyes</li>
            <li>rmichael</li>
            <li>jwarren</li>
            </ul></CardText>
            <Button>Expand</Button>
          </Card>
        </Col>
        <Col sm="4">
          <Card body className="shadow-lg">
          <CardHeader className="font-weight-bold">Total hours ingested this week</CardHeader>
            <CardTitle></CardTitle>
            <CardText style={{fontSize: "40px"}} className="text-center font-weight-bold">34</CardText>
          </Card>
        </Col>
        <Col sm="4">
          <Card body className="shadow-lg">
            <CardHeader className="font-weight-bold">Total hours published this week</CardHeader>
            <CardTitle></CardTitle>
            <CardText style={{fontSize: "40px"}} className="text-center font-weight-bold">22</CardText>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Dashboard;