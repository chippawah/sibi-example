import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import find from 'lodash/find';
import remove from 'lodash/remove';
import {
  Button,
  ButtonGroup,
  Glyphicon,
  Label,
  ListGroupItem,
  Grid,
  Row,
  Col,
  Form,
  FormControl,
  FormGroup,
  ControlLabel
 } from 'react-bootstrap';

import {
  UPDATE_USER,
  USER_QUERY,
  DELETE_USER,
  TODO_QUERY,
} from '../../constants';

export default class User extends Component {
  // Using constructor here to set state initially with user email
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      email: this.props.user.email,
    };
  }
  // Helper to render the basic user info
  renderUser = () => {
    return ( <p><Label>Email:</Label>{this.props.user.email}</p> )
  }
  // Helper to update the state when input changes
  handleEditorChange = ({ target: { value: email } }) => {
    this.setState({ email });
  }
  // Helper to prevent form default and submit the mutation
  handleEditorSave = (mutation) => {
    return (event) => {
      event.preventDefault();
      this.handleEdit()
      mutation();
    }
  }
  // Helper to update the store with the updated user
  updateStore = (store, { data: { updateUser: user } }) => {
    const query = USER_QUERY;
    const { users } = store.readQuery({ query });
    const updated_user = find(users, ({ _id }) => { return _id === user._id });
    updated_user.email = user.email;
    store.writeQuery({query, data: { users }});
  }
  // Helper to render the update mutation
  updateChild = (mutation) => {
    return (
      <Button
        bsStyle="success"
        type="submit"
        onClick={this.handleEditorSave(mutation)}
      >
        <Glyphicon glyph="floppy-disk"/>
      </Button>
    )
  }
  // Helper to clean out store after user is removed
  deleteFromStore = async (store, { data: { deleteUser: user }}) => {
    const { users } = store.readQuery({ query: USER_QUERY });
    const { todos } = store.readQuery({ query: TODO_QUERY });
    remove(users, ({ _id }) => { return _id === user._id });
    remove(todos, ({ author: { email } }) => { return email === user.email });
    sessionStorage.clear();
    store.writeQuery({ query: USER_QUERY, data: { users }});
    store.writeQuery({ query: TODO_QUERY, data: { todos }});
    this.props.history.push('/');
  }
  // Fn for delete mutation child
  deleteChild = (mutation) => {
    return (
      <Button bsStyle="danger" onClick={mutation}>
        <Glyphicon glyph="trash" />
      </Button>
    )
  }
  // Renders the editor for the user
  renderEditor = () => {
    return (
      <div>
        <Row>Editing user: {this.props.user.email}</Row>
        <Row>
          <Form>
            <FormGroup controlId="userEmail">
              <ControlLabel>Update your email here</ControlLabel>
              <FormControl
                type="text"
                value={this.state.email}
                onChange={this.handleEditorChange}
              />
            </FormGroup>
            <ButtonGroup>
              <Button
                bsStyle="warning"
                onClick={this.handleEdit}
              >
                <Glyphicon glyph="arrow-left" />
              </Button>
              <Mutation
                mutation={UPDATE_USER}
                update={this.updateStore}
                variables={{ email: this.state.email }}
                refetchQueries={[USER_QUERY, TODO_QUERY]}
              >
                {this.updateChild}
              </Mutation>
            </ButtonGroup>
          </Form>
        </Row>
      </div>
    )
  }
  // Handles updating state when the edit button is clicked
  handleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }
  // Helper to render the edit and delete buttons if it's the authed user
  renderButtons = () => {
    if (this.props.allow_mutations) {
      return (
        <ButtonGroup>
          <Button bsStyle="warning" onClick={this.handleEdit}>
            <Glyphicon glyph="pencil" />
          </Button>
          <Mutation
            mutation={DELETE_USER}
            variables={{_id: this.props.user._id}}
            update={this.deleteFromStore}
          >
            {this.deleteChild}
          </Mutation>
        </ButtonGroup>
      ) ;
    }
  }
  render () {
    return (
      <ListGroupItem>
        <Grid>
          <Row>
            <Col md={8}>
              {this.state.editing ? this.renderEditor() : this.renderUser()}
            </Col>
            <Col md={4}>
              {this.state.editing ? '' : this.renderButtons()}
            </Col>
          </Row>
        </Grid>
      </ListGroupItem>
    )
  }
}
