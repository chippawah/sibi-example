import React, { Component } from 'react';
import { Label, ListGroupItem } from 'react-bootstrap';

export default class User extends Component {
  render () {
    return (
      <ListGroupItem>
        <p><Label>Email:</Label> {this.props.user.email}</p>
      </ListGroupItem>
    )
  }
}
