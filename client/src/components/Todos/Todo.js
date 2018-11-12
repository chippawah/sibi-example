import React, { Component } from 'react';
import {
  Button,
  ButtonGroup,
  ListGroupItem,
  Glyphicon,
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import remove from 'lodash/remove'

import { TODO_QUERY, DELETE_TODO } from '../../constants'

// Helper to render the mutation child fn
const mutationChild = (mutation) => {
  return (
    <ButtonGroup>
      <Button bsSize="small" bsStyle="danger" onClick={mutation}>
        <Glyphicon glyph="trash" />
      </Button>
    </ButtonGroup>
  )
}

export default class Todo extends Component {
  // Helper to update the store with the updated todo
  handleUpdate = (_id) => {
    return (store, { data: { todo } }) => {
      const query = TODO_QUERY;
      const res = store.readQuery({ query });
      let todos = []
      if (res.todos) { todos = res.todos }
      const updated = remove(todos, (item) => {
        return item._id !== _id
      });
      store.writeQuery({ query , data: { todos: updated }});
    }
  }
  render () {
    const {_id, text, author} = this.props.todo;
    return (
      <ListGroupItem >
        <Grid>
          <Row>{text}</Row>
          <Row>
            <Col md={8} xs={12}>By: {author.email}</Col>
            <Col md={4} xs={12}>
              <Mutation
                mutation={DELETE_TODO}
                variables={{ _id }}
                update={this.handleUpdate(_id)}
              >
                {mutationChild}
              </Mutation>
            </Col>
          </Row>
        </Grid>
      </ListGroupItem>
    )
  }
}
