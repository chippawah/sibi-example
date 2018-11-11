import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';

import { TODO_QUERY, POST_TODO } from '../../constants';

export default class CreateTodo extends Component {
  state = { text: '' }
  handleUpdate = (store, { data: { createTodo: newTodo } }) => {
    const query = TODO_QUERY;
    const { todos } = store.readQuery({ query });
    todos.push(newTodo);
    store.writeQuery({ query, data: { todos } });
  }
  render() {
    const { text } = this.state;
    return (
      <div>
        <input
          value={text}
          onChange={(e) => this.setState({ text: e.target.value })}
          type="text"
          placeholder="The text for the todo"
        />
        <Mutation
          mutation={POST_TODO}
          variables={{ text }}
          onCompleted={async () => this.props.history.push('/todos')}
          update={this.handleUpdate}
        >
          {(mutation) => ( <Button onClick={mutation}> Add todo </Button> )}
        </Mutation>
      </div>
    )
  }
}
