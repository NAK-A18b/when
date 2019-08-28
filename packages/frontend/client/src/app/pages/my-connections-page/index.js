import React from 'react';

import Heading from "../../components/heading";
import EmptyIllustration from '../../components/illustrations/empty';

import './styles.css';

const baseClassName = 'connectionsPage';

const MyConnectionsPage = () => {
  return (
    <div>
      <Heading title="My connections" subtitle="0"/>
      <div className={ `${baseClassName}-body-wrapper` }>
        <EmptyIllustration />
      </div>
    </div>
  );
}

export default MyConnectionsPage;