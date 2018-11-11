import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

import { AUTH_TOKEN } from '../constants';


class Header extends Component {
  handleClick = (path) => {
    return () => {
      this.props.history.push(path);
    }
  }
  render(){
    const authToken = sessionStorage.getItem(AUTH_TOKEN)
    return (
      <Navbar>
        <Navbar.Header><Navbar.Brand>Sibi Example</Navbar.Brand></Navbar.Header>
          {authToken ? (
            <Nav>
              <NavItem onClick={this.handleClick('/todos')}>
                View All Todos
              </NavItem>
              <NavItem onClick={this.handleClick('/create-todo')}>
                Add Todo Form
              </NavItem>
              <NavItem onClick={this.handleClick('/')}>
                View All Users
              </NavItem>
              <NavItem onClick={this.handleClick('/logout')}>
                Logout
              </NavItem>
            </Nav>
          ) : (
            <Nav>
              <NavItem onClick={this.handleClick('/login')}>Login</NavItem>
              <NavItem onClick={this.handleClick('/')}>View All Users</NavItem>
            </Nav>
          )}
      </Navbar>
    )
  }
}
export default withRouter(Header)
