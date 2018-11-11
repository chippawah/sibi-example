import React, { Component } from 'react';
import { Button, ButtonToolbar, PageHeader } from 'react-bootstrap';
import { Mutation } from 'react-apollo';

import { AUTH_TOKEN, LOGIN_MUTATION, SIGNUP_MUTATION } from '../constants';

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
        <Button bsStyle="success" onClick={mutation}>
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

  render() {
    const { login, email, password } = this.state;
    return (
      <div>
        <PageHeader>{login ? 'Login' : 'Sign Up'}</PageHeader>
        <div>
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <Mutation
          mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password }}
          onCompleted={(data) => {this._saveUser(data)}}
        >
          {this.handleMutation}
        </Mutation>
      </div>
    )
  }
}
