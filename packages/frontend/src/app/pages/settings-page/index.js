import React from 'react';

import Heading from '../../components/heading';

import SelectCenturia from '../../components/select-centuria';

import './styles.css';

const baseClassName = 'settingsPage';

const SettingsPage = props => {
  return (
    <div>
      <Heading title='Settings' subtitle='' />
      <div className={`${baseClassName}-body-wrapper`}>
        <SelectCenturia user={props.user} />
      </div>
    </div>
  );
};

export default SettingsPage;
