import React from 'react';
import { withApollo } from 'react-apollo';

import { AUTH_TOKEN } from '../../constants';

import { initialContext, Consumer, Provider as ContextProvider } from './context';
import { loginMutation, triggerAuth, currentUserQuery } from './resolvers';

import { userId, authToken } from '../../utils/authentication';

export default withApollo (
  class Provider extends React.Component {

    state = {
      loading: true,
      data: null,
    }

    componentDidMount = async () => {
      const { client } = this.props;
      const id = authToken();
      const loggedIn = !!id;
      
      this.setState({
        data: loggedIn ? await currentUserQuery(client, { id }) : null,
        loggedIn,
        loading: false,
      });
    }

    login = (tel, token) => {
      const { client } = this.props;
      loginMutation(client, { tel, token }).then((data) => {
        if (!data) return;

        localStorage.setItem(AUTH_TOKEN, data.id);
        this.setState({
          data,
          loggedIn: true,
        })
      })
    }

    logout = () => {
      localStorage.removeItem(AUTH_TOKEN);
      this.setState({
        loggedIn: false,
      })
    }

    triggerAuthentication = async (tel) => {
      const { client } = this.props;
      return triggerAuth(client, { tel });
    }

    render = () => {
      const { children } = this.props;
      const { logout, login, triggerAuthentication } = this;

      return (
        <ContextProvider
          value={{
            ...this.state,
            logout,
            login,
            triggerAuthentication
          }}
        >
          { children }
        </ContextProvider>
      );
    }
  }
);

const withUser = WrappedComponent => props => (
  <Consumer>
    {(context) => <WrappedComponent {...props} user={context} />}
  </Consumer>
);

export { Consumer, initialContext, withUser };