import React from "react";
import { withApollo } from "react-apollo";

import { token } from "../../utils/authentication";
import { AUTH_TOKEN } from "../../constants";

import {
  initialContext,
  Consumer,
  Provider as ContextProvider
} from "./context";
import { loginMutation, triggerAuth, currentUserQuery } from "./resolvers";

export default withApollo(
  class Provider extends React.Component {
    state = {
      loading: true,
      data: null
    };

    componentDidMount = async () => {
      const { client } = this.props;
      const user = token() && (await currentUserQuery(client));

      if (!user) {
        localStorage.removeItem(AUTH_TOKEN);
      }

      this.setState({
        data: user,
        loggedIn: !!user,
        loading: false
      });
    };

    refetchData = async () => {
      const { client } = this.props;
      currentUserQuery(client).then(data => {
        this.setState({
          data
        });
      });
    };

    login = (tel, authCode) => {
      const { client } = this.props;
      loginMutation(client, { tel, authCode }).then(data => {
        if (!data) return;

        localStorage.setItem(AUTH_TOKEN, data.token);
        this.setState({
          data,
          loggedIn: true
        });
      });
    };

    logout = () => {
      localStorage.removeItem(AUTH_TOKEN);
      this.setState({
        loggedIn: false,
        data: null
      });
    };

    triggerAuthentication = async tel => {
      const { client } = this.props;
      return await triggerAuth(client, { tel });
    };

    render = () => {
      const { children } = this.props;
      const { logout, login, triggerAuthentication, refetchData } = this;

      return (
        <ContextProvider
          value={{
            ...this.state,
            refetchData,
            logout,
            login,
            triggerAuthentication
          }}
        >
          {children}
        </ContextProvider>
      );
    };
  }
);

const withUser = WrappedComponent => props => (
  <Consumer>
    {context => <WrappedComponent {...props} user={context} />}
  </Consumer>
);

export { Consumer, initialContext, withUser };
