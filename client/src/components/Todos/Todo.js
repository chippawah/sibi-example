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

const mutationChild = (mutation) => {
  return (
    <ButtonGroup>
      <Button bsSize="small" bsStyle="danger" onClick={mutation}>
        <Glyphicon glyph="remove-circle" />
      </Button>
    </ButtonGroup>
  )
}

export default class Todo extends Component {
  handleUpdate = (_id) => {
    return (store, { data: { todo } }) => {
      console.log('HANDLE UDATE CLOSURE')
      const query = TODO_QUERY;
      const res = store.readQuery({ query })
      if (res) {
        console.log('REMOVE', remove)
        const { todos } = res;
        const updated = remove(todos, { _id });
        console.log('UPDATES AFTER REMOVE', updated);
        store.writeQuery({ query }, updated);
      }
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
