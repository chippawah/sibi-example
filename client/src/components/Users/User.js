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
  FormControl,
  FormGroup,
  ControlLabel
 } from 'react-bootstrap';

import { UPDATE_USER, USER_QUERY, DELETE_USER } from '../../constants';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      email: this.props.user.email,
    };
  }
  renderUser = () => {
    return ( <p><Label>Email:</Label>{this.props.user.email}</p> )
  }
  handleEditorChange = ({ target: { value: email } }) => {
    this.setState({ email });
  }
  handleEditorSave = (mutation) => {
    return (event) => {
      event.preventDefault();
      this.handleEdit()
      mutation();
    }
  }
  updateStore = (store, { data: { updateUser: user } }) => {
    const query = USER_QUERY;
    const { users } = store.readQuery({ query });
    const updated_user = find(users, ({ _id }) => { return _id === user._id });
    updated_user.email = user.email;
    store.writeQuery({query, data: { users }});
  }
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
  deleteFromStore = async (store, { data: { deleteUser: user }}) => {
    const query = USER_QUERY;
    const { users } = store.readQuery({ query });
    remove(users, ({ _id }) => { return _id === user._id });
    sessionStorage.clear();
    store.writeQuery({ query, data: { users }});
    this.props.history.push('/');
  }
  deleteChild = (mutation) => {
    return (
      <Button bsStyle="danger" onClick={mutation}>
        <Glyphicon glyph="trash" />
      </Button>
    )
  }
  renderEditor = () => {
    return (
      <div>
        <Row>Editing user: {this.props.user.email}</Row>
        <Row>
          <form>
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
              >
                {this.updateChild}
              </Mutation>
            </ButtonGroup>
          </form>
        </Row>
      </div>
    )
  }
  handleEdit = () => {
    this.setState({ editing: !this.state.editing });
  }
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
