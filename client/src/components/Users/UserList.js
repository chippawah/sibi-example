import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { ListGroup, PageHeader } from 'react-bootstrap';
import jwt from 'jsonwebtoken';

import { USER_QUERY, AUTH_TOKEN } from '../../constants';
import User from './User';

export default class UserList extends Component {
  render() {
    return (
      <div>
        <PageHeader>Users <small>The list of all Users</small></PageHeader>
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
                {users.map((user) => {
                  let allow_mutations = false;
                  if (user._id === authed_user) {
                    allow_mutations = true;
                  }
                  return (<User
                    history={this.props.history}
                    allow_mutations={allow_mutations}
                    key={user._id}
                    user={user}
                  />);
                })}
              </ListGroup>
            )
          }}
        </Query>
      </div>
    )
  }
}
