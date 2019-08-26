import React from 'react';

import CreateConnection from '../../components/create-connection';
import CreateCenturia from '../../components/create-centuria';
import './styles.css';
import Heading from "../../components/heading";

const DelayPage = () => {
  return (
    <div>
      <Heading title="Delays" subtitle="0 reported"/>
      <img src="images/undraw_subway_7vh7.svg"/>
    </div>
  );
}

export default DelayPage;