import React from 'react';

import Heading from "../../components/heading";
import CreateConnection from '../../components/create-connection';

const AllConnectionsPage = () => {
  return (
    <div>
      <Heading title="Connections" subtitle="0"/>
      <CreateConnection />
    </div>
  );
}

export default AllConnectionsPage;