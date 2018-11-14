import React, { Component } from 'react';
import { Query } from 'react-apollo';
import {
  ListGroup,
  PageHeader,
  Form,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';
import jwt from 'jsonwebtoken';

import { USER_QUERY, AUTH_TOKEN } from '../../constants';
import User from './User';

export default class UserList extends Component {
  state = { filter: '' }
  renderSearch = () => {
    return (
      <Form>
        <FormGroup>
          <ControlLabel>Search for user by first name</ControlLabel>
          <FormControl
            type="text"
            value={this.state.filter}
            onChange={(e) => this.setState({ filter: e.target.value })}
          />
        </FormGroup>
      </Form>
    )
  }
  // Helper to render the Users and allow mutations on authed user
  renderUsers = (users, authed_user) => {
    let filteredUsers = users
    if (this.state.filter !== '') {
      const filter = this.state.filter.toLowerCase()
      filteredUsers = users.filter((user) => {
        return user.first_name.toLowerCase().search(filter) > -1
      });
    }
    return filteredUsers.map((user) => {
      let allow_mutations = false;
      if (user._id === authed_user) {
        allow_mutations = true;
      }
      return (
        <User
          history={this.props.history}
          allow_mutations={allow_mutations}
          key={user._id}
          user={user}
        />
      );
    })
  }
  render() {
    return (
      <div>
        <PageHeader>Users <small>The list of all Users</small></PageHeader>
        {this.renderSearch()}
        <Query query={USER_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <div>
                  Fetching Data...
                </div>
              )
            }
            if (error) {
              console.error('error', error);
              return (
                <div>
                  Error while fetching data...
                </div>
              )
            }
            const { users } = data;
            const token = sessionStorage.getItem(AUTH_TOKEN);
            let authed_user;
            if (token) {
              const { user_id } = jwt.decode(token);
              authed_user = user_id;
            }
            return (
              <ListGroup>
                {this.renderUsers(users, authed_user)}
              </ListGroup>
            )
          }}
        </Query>
      </div>
    )
  }
}
