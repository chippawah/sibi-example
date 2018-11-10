import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { ListGroup, PageHeader } from 'react-bootstrap';

import User from './User'

export default class UserList extends Component {
  render() {
    const USER_QUERY = gql`
      {
        users {
          email
          _id
        }
      }
    `
    return (
      <div>
        <PageHeader>Users <small>The list of all Users</small></PageHeader>
        <Query query={USER_QUERY}>
          {({ loading, error, data }) => {
            console.log(data);
            if (loading) {
              return (
                <div>
                  Fetching Data...
                </div>
              )
            }
            if (error) {
              console.log('error', error)
              return (
                <div>
                  Error while fetching data...
                </div>
              )
            }
            const { users } = data;
            return (
              <ListGroup>
                {users.map((user) => {
                  return <User key={user._id} user={user} />
                })}
              </ListGroup>
            )
          }}
        </Query>
      </div>
    )
  }
}
