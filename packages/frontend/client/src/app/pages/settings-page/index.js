import React from 'react';

import Heading from '../../components/heading';
import EmptyIllustration from '../../components/illustrations/empty';

import './styles.css';
import SelectCenturia from '../../components/select-centuria';

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
