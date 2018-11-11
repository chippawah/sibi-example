import gql from 'graphql-tag';

export const AUTH_TOKEN = 'auth-token';

export const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`

export const TODO_QUERY = gql`
  {
    todos {
      text
      _id
      author {
        email
      }
    }
  }
`

export const DELETE_TODO = gql`
  mutation DeleteTodo($_id: ID!) {
    deleteTodo(_id: $_id) {
      _id
    }
  }
`

export const POST_TODO = gql`
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

export const USER_QUERY = gql`
  {
    users {
      email
      _id
    }
  }
`
