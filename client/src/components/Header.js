import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

import { AUTH_TOKEN } from '../constants';


class Header extends Component {
  render(){
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <Navbar>
        <Navbar.Header><Navbar.Brand>Sibi Example</Navbar.Brand></Navbar.Header>
          {authToken ? (
            <Nav>
              <NavItem><Link to="/todos">View All Todos</Link></NavItem>
              <NavItem><Link to="/create-todo">Add Todo Form</Link></NavItem>
              <NavItem><Link to="/">View All Users</Link></NavItem>
            </Nav>
          ) : (
            <Nav>
              <NavItem><Link to="/login">Login</Link></NavItem>
              <NavItem><Link to="/">View All Users</Link></NavItem>
            </Nav>
          )}
      </Navbar>
    )
  }
}
export default withRouter(Header)
