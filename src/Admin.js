import React, { useState, useContext, useMutation } from 'react';
import Users from './Users';
import Platforms from './Platforms';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import {Link} from "react-router-dom";

const Admin = () => {
  console.log('Admin component rendered');

  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (

    <div>
      <div className="m-3">
        <h1>Admin</h1>
      </div>
      <Nav tabs>
        <NavItem>
          <NavLink to="/admin" tag={Link} className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>Users</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/admin" tag={Link} className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>Platforms</NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
        <Users/>
        </TabPane>
        <TabPane tabId="2">
        <Platforms/>
        </TabPane>
      </TabContent>
    </div>
 
  )
}

export default Admin;