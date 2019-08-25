import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
  mutation LoginMutation($tel: String!, $token: Int!) {
    loginUser(tel: $tel, token: $token) {
      id
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

const TRIGGER_AUTH_MUTATION = gql`
  mutation TriggerAuth($tel: String!) {
    triggerAuth(tel: $tel)
  }
`

const CURRENT_USER_QUERY = gql`
  query CurrentUser($id: String!) {
    currentUser(id: $id) {
      id
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

export const triggerAuth = (client, variables) => 
  client.mutate({
    mutation: TRIGGER_AUTH_MUTATION,
    variables
  })
  .then(result => result.data.triggerAuth);

export const currentUserQuery = (client, variables) =>
  client.query({
    query: CURRENT_USER_QUERY,
    variables
  })
  .then(result => result.data.currentUser);