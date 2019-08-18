import * as React from 'react';

export const initialContext = {
  loading: true,
  auth: false,
  loggedIn: false,
  data: null,
  login: (email, password) => null,
  register: (email, password, username, tel, centuria) => null,
  logout: () => null,
};

export const { Consumer, Provider } = React.createContext(initialContext);
