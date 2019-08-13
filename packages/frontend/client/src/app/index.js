import React from 'react';

import CreateUser from './components/create-user';
import CreateConnection from './components/create-connection';
import CreateCenturia from './components/create-centuria';
import Connections from './components/connections';

import './styles.css';

const App = () => {
  return (
    <div>
      <div className="page">
        <Connections />
        <div className="create-forms">
          <CreateUser />
          <CreateConnection />
          <CreateCenturia />
        </div>
      </div>
    </div>
  );
}

export default App;
