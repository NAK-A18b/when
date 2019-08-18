import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!) {
    loginUser(email: $email)
  }
`

const REGISTER_MUTATION = gql`
  mutation RegisterMutation($email: String!, $username: String!, $tel: String!, $centuria: String!) {
    registerUser(email: $email, username: $username, tel: $tel, centuria: $centuria)
  }
`

const CURRENT_USER_QUERY = gql`
  query CurrentUser($id: String!, $token: Int!) {
    currentUser(id: $id, token: $token) {
      id
      username
      email
      token
      centuria {
        name
        semester
      }
      connections {
        id
        start {
          name
        }
        end {
          name
        }
      }
    }
  }
`

export const loginMutation = (client, variables) => 
  client.mutate({
    mutation: LOGIN_MUTATION,
    variables,
  })
  .then(result => result.data.loginUser);

export const registerMutation = (client, variables) => 
  client.mutate({
    mutation: REGISTER_MUTATION,
    variables
  })
  .then(result => result.data.registerUser);

export const currentUserQuery = (client, variables) =>
  client.query({
    query: CURRENT_USER_QUERY,
    variables
  })
  .then(result => result.data.currentUser);