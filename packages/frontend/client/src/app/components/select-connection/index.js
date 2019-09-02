import React from 'react';

import './styles.css';
import ConnectionIndicator from "../connection-indicator";
import Label from "../label";
import AddIcon from '@material-ui/icons/Add';

import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";

const SelectConnection = (props) => {
  const {user} = props;

  return (
    <div className={'delay-wrapper'}>
      <div className={'delay-body-wrapper'}>
        <div className={'delay-station-info-wrapper'}>
          <ConnectionIndicator color="#3F51B5"/>
          <div className={'delay-station-info'}>
            <Label primary>{props.start}</Label>
            <Label primary>{props.end}</Label>
          </div>
        </div>
        <Box ml={2}/>
        <Fab size="small" color="secondary" aria-label="add">
          <AddIcon/>
        </Fab>

      </div>
    </div>
  );
};

export default SelectConnection;
