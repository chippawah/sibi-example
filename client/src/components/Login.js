import React, { Component } from 'react';
import {
  Button,
  ButtonToolbar,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Grid,
  Row
} from 'react-bootstrap';
import { Mutation } from 'react-apollo';

import {
  AUTH_TOKEN,
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  USER_QUERY
} from '../constants';

export default class Login extends Component {

  state = {
    login: true,
    email: '',
    password: '',
  }

  _saveUser = async (data) => {
    const { token } = this.state.login ? data.login : data.signup
    sessionStorage.setItem(AUTH_TOKEN, token);
    this.props.history.push('/');
  }

  handleMutation = (mutation) => {
    const { login } = this.state
    return (
      <ButtonToolbar>
        <Button type="submit" bsStyle="success" onClick={(e) => {
          e.preventDefault()
          mutation();
        }}>
          {login ? 'Login' : 'Create Account'}
        </Button>
        <Button
          bsStyle="warning"
          onClick={() => this.setState({ login: !login })}
        >
          {login ? 'Click here to Signup' : 'Click here to Login'}
        </Button>
      </ButtonToolbar>
    )
  }
  updateStore = (store, { data }) => {
    if (data.signup) {
      const { signup: { user } } = data
      const query = USER_QUERY;
      const { users } = store.readQuery({ query });
      users.push(user);
      store.writeQuery({query, data: { users }})
    }
  }
  render() {
    const { login, email, password } = this.state;
    return (
      <Form>
        <FormGroup controlId="userForm">
          <ControlLabel>{login ? 'Login' : 'Sign Up'}</ControlLabel>
          <Grid>
            <FormGroup controlId="userFormEmail">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                type="text"
                placeholder="Your email address"
              />
            </FormGroup>
            <FormGroup controlId="userFormPassword">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={password}
                onChange={e => this.setState({ password: e.target.value })}
                type="password"
                placeholder="Choose a safe password"
              />
            </FormGroup>
            <Row>
              <Mutation
                mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
                variables={{ email, password }}
                onCompleted={(data) => {this._saveUser(data)}}
                update={this.updateStore}
              >
                {this.handleMutation}
              </Mutation>
            </Row>
          </Grid>
        </FormGroup>
      </Form>
    )
  }
}
