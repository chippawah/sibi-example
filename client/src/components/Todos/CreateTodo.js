import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
} from 'react-bootstrap';
import { Mutation } from 'react-apollo';

import { TODO_QUERY, POST_TODO } from '../../constants';

export default class CreateTodo extends Component {
  state = { text: '' }
  handleUpdate = (store, { data: { createTodo: newTodo } }) => {
    const query = TODO_QUERY;
    const res = store.readQuery({ query });
    const { todos } = res;
    todos.push(newTodo);
    store.writeQuery({ query, data: { todos } });
  }
  render() {
    const { text } = this.state;
    return (
      <Form>
        <FormGroup controlId="todoTextForm">
          <ControlLabel>Add a New Todo</ControlLabel>
          <FormControl
            value={text}
            onChange={(e) => this.setState({ text: e.target.value })}
            type="text"
            placeholder="The text for the todo"
          />
        </FormGroup>
        <Mutation
          mutation={POST_TODO}
          variables={{ text }}
          onCompleted={async () => this.props.history.push('/todos')}
          update={this.handleUpdate}
        >
          {(mutation) => {
            return (
              <Button type="submit" onClick={(e) => {
                e.preventDefault()
                mutation();
              }}>
                Add todo
              </Button>
            )
          }}
        </Mutation>
      </Form>
    )
  }
}
