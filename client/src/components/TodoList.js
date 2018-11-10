import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Todo from './Todo'

export default class TodoList extends Component {
  render() {
    const TODO_QUERY = gql`
      {
        todos {
          text
          _id
          author {
            email
          }
        }
      }
    `
    return (
      <Query query={TODO_QUERY}>
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
          const { todos } = data;
          return (
            <div>
              {todos.map((todo) => {
                return <Todo key={todo._id} todo={todo} />
              })}
            </div>
          )
        }}
      </Query>
    )
  }
}
