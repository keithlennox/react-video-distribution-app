import React, { useState } from 'react';
import { NavbarText, NavbarToggler, Collapse, Navbar, Nav, NavItem, NavLink, NavbarBrand, Container, Col} from 'reactstrap';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Logo from './TVO_Bug.png';
import './App.css';

const Navigation = () => {
  console.log('Navbar component loaded');
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

    /*The solution used below for using Reactstrap NavBar with React Router
    was found at: https://github.com/reactstrap/reactstrap/issues/1285
    The issue: they both have a component called NavLink*/
    return (
      <div>
      <Navbar color="danger" light expand="md">
        <NavbarBrand>
          <img src={Logo} alt="TVO Logo"/>
        </NavbarBrand>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/" tag={Link} className="text-white">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/assets" tag={Link} className="text-white">Search</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/collection" tag={Link} className="text-white">Collection</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/restores" tag={Link} className="text-white">Restore</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/instances" tag={Link} className="text-white">Publish</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/schedules" tag={Link} className="text-white">Schedule</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/admin" tag={Link} className="text-white">Admin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/login" tag={Link} className="text-white">Logout</NavLink>
            </NavItem>
          </Nav>
          <NavbarText className="text-white"><h2>Video Distribution Application</h2></NavbarText>
        </Collapse>
        <NavbarToggler onClick={toggle} />
      </Navbar>
      </div>
    )
}

export default Navigation;