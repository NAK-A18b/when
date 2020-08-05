import * as React from 'react';

export const initialContext = {
  loading: true,
  loggedIn: false,
  data: null,
  login: (tel, authCode) => null,
  logout: () => null,
  triggerAuthentication: (tel) => null,
  refetchData: () => null,
};

export const {
  Consumer,
  Provider
} = React.createContext(initialContext);