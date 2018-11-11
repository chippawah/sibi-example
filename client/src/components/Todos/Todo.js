import React, { Component } from 'react';
import { Button, Label, ListGroupItem } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import remove from 'lodash/remove'

import { TODO_QUERY, DELETE_TODO } from '../../constants'

const handleUpdate = (_id) => {
  return (store, { data: { todo } }) => {
    const query = TODO_QUERY;
    const { todos } = store.readQuery({ query });
    const updated = remove(todos, { _id });
    return store.writeQuery({ query }, updated);
  }
}

export default class Todo extends Component {
  render () {
    const {_id, text, author} = this.props.todo;
    console.log(_id )
    return (
      <ListGroupItem header={`Todo: ${text}`}>
        <div><Label>By:</Label> {author.email}</div>
        <Mutation
          mutation={DELETE_TODO}
          variables={{ _id }}
          update={handleUpdate(_id)}
        >
          {(mutation) => {
            return (
              <Button
                bsStyle="danger"
                onClick={mutation}
              >
                Delete Todo
              </Button>
            )
          }}
        </Mutation>
      </ListGroupItem>
    )
  }
}
