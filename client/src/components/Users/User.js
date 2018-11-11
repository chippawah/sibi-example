import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import find from 'lodash/find';
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

import { UPDATE_USER, USER_QUERY } from '../../constants';

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
      console.log('SAVE WITH NEW EMAIL', this.state.email);
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
  mutationChild = (mutation) => {
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
                variables={{ email: this.state.email }}
                update={this.updateStore}
              >
                {this.mutationChild}
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
          <Button bsStyle="danger">
            <Glyphicon glyph="trash" />
          </Button>
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
