import React, { Component } from 'react';
import { Button, ButtonToolbar, PageHeader } from 'react-bootstrap';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`

class Login extends Component {
  state = {
    login: true,
    email: '',
    password: '',
  }
  _confirm = async (data) => {
    const { token } = this.state.login ? data.login : data.signup
    this._saveUserData(token);
    this.props.history.push('/');
  }
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  render() {
    const { login, email, password } = this.state
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
          onCompleted={(data) => {this._confirm(data)}}
        >
          {(mutation) => {
            return (
              <ButtonToolbar>
                <Button bsStyle="success" onClick={mutation}>
                  {login ? 'Login' : 'Create Account'}
                </Button>
                <Button bsStyle="warning" onClick={() => this.setState({ login: !login })}>
                  {login
                    ? 'Click here to Signup'
                    : 'Click here to Login'}
                </Button>
              </ButtonToolbar>
            )
          }}
        </Mutation>
      </div>
    )
  }
}

export default Login
