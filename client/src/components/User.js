import React, { Component } from 'react';

export default class User extends Component {
  render () {
    return (
      <div>
        <div>
          <p>email: {this.props.user.email}</p>
        </div>
        <br />
      </div>
    )
  }
}
