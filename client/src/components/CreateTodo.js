import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


export default class CreateTodo extends Component {
  state = { text: '' }
  render() {
    const POST_TODO = gql`
      mutation PostTodo($text: String!) {
        createTodo(text: $text) {
          _id
          text
          author {
            email
          }
        }
      }
    `
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
          onComplete={() => this.props.history.push('/todos')}
        >
          {(postTodo) => (
            <Button onClick={postTodo}>
              Add todo
            </Button>
          )}
        </Mutation>
      </div>
    )
  }
}
