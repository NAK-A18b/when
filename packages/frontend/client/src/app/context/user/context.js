import * as React from 'react';

export const initialContext = {
  loading: true,
  loggedIn: false,
  data: null,
  login: (tel, token) => null,
  logout: () => null,
  triggerAuthentication: (tel) => null,
};

export const { Consumer, Provider } = React.createContext(initialContext);
