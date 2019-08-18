import React from 'react';
import { withApollo } from 'react-apollo';

import { AUTH_TOKEN, USER_ID } from '../../constants';

import { initialContext, Consumer, Provider as ContextProvider } from './context';
import { loginMutation, registerMutation, currentUserQuery } from './resolvers';

import { userId, authToken } from '../../utils/authentication';

export default withApollo (
  class Provider extends React.Component {

    state = {
      loading: true,
      data: null,
    }

    componentDidMount = async () => {
      const { client } = this.props;
      const token = authToken();
      const id = userId();
      const loggedIn = !!token;
      
      this.setState({
        data: loggedIn ? await currentUserQuery(client, { id, token }) : null,
        auth: !!id && !loggedIn,
        loggedIn,
        loading: false,
      });
    }

    login = (email) => {
      const { client } = this.props;
      loginMutation(client, { email }).then((data) => {
        if (!data) return;

        localStorage.setItem(USER_ID, data);
        this.setState({
          auth: true,
        })
      })
    }

    logout = () => {
      localStorage.removeItem(AUTH_TOKEN);
      localStorage.removeItem(USER_ID);
      this.setState({
        loggedIn: false,
      })
    }

    authenticate = (token) => {
      const { client } = this.props;
      const id = userId();

      currentUserQuery(client, { id, token }).then(user => {
        if (!user) return;

        localStorage.setItem(AUTH_TOKEN, user.token);
        this.setState({
          loggedIn: true,
          auth: false,
          data: user,
        });
      })
    }

    register = (email, password, username, tel, centuria) => {
      const { client } = this.props;
      registerMutation(client, { email, password, username, tel, centuria })
      .then(id => {
        if(!id) return;

        localStorage.setItem(USER_ID, id);
        this.setState({
          auth: true,
        });
      })
    }

    render = () => {
      const { children } = this.props;
      const { logout, login, register, authenticate } = this;

      return (
        <ContextProvider
          value={{
            ...this.state,
            logout,
            login,
            register,
            authenticate
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