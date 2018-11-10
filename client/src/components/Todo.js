import React, { Component } from 'react';
import { Label, ListGroupItem } from 'react-bootstrap';

export default class Todo extends Component {
  render () {
    return (
      <ListGroupItem header={`Todo: ${this.props.todo.text}`}>
        <div><Label>By:</Label> {this.props.todo.author.email}</div>
      </ListGroupItem>
    )
  }
}
