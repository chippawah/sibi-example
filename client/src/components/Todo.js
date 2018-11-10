import React, { Component } from 'react';

export default class Todo extends Component {
  render () {
    return (
      <div>
        <div>
          <p>Text: {this.props.todo.text}</p>
          <p>By: {this.props.todo.author.email}</p>
        </div>
        <br />
      </div>
    )
  }
}
