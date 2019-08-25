import React from 'react';

import CreateConnection from '../../components/create-connection';
import CreateCenturia from '../../components/create-centuria';

const ConnectionPage = () => {
  return (
    <div>
      <CreateConnection />
      <CreateCenturia />
    </div>
  );
}

export default ConnectionPage;