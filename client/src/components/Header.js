import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Header extends Component {
  render(){
    return (
      <Navbar>
        <Navbar.Header><Navbar.Brand>Sibi Example</Navbar.Brand></Navbar.Header>
        <Nav>
          <NavItem><Link to="/signup">Sign Up</Link></NavItem>
          <NavItem><Link to="/login">Login</Link></NavItem>
          <NavItem><Link to="/todos">View All Todos</Link></NavItem>
          <NavItem><Link to="/">View All Users</Link></NavItem>
          <NavItem><Link to="/create-todo">Add Todo Form</Link></NavItem>
        </Nav>
      </Navbar>
    )
  }
}
export default withRouter(Header)
