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
  mutation SignUp($first_name: String!, $last_name: String!, $email: String!, $password: String!) {
    signup(first_name: $first_name, last_name: $last_name, email: $email, password: $password) {
      token
      user {
        _id
        email
        first_name
        last_name
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($email: String, $first_name: String, $last_name: String) {
    updateUser(email: $email, first_name: $first_name, last_name: $last_name) {
      _id
      email
      first_name
      last_name
    }
  }
`

export const DELETE_USER = gql`
  mutation {
    deleteUser {
      _id
      email
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
      first_name
      last_name
    }
  }
`
