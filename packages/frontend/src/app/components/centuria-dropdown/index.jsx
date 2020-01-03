import React from 'react';

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const CENTURIAS = gql`
  query getCenturias {
    centurias {
      id
      name
    }
  }
`

const CenturiaDropdown = (props) => {
  const { changeCallback, value } = props;
  const { loading, data } = useQuery(CENTURIAS);

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="age-simple">Zenturie</InputLabel>
      <Select
        input={<OutlinedInput labelWidth={60} id="outlined-age-simple" />}
        className="centuria-select"
        value={value}
        onChange={changeCallback}
      >
        { !loading && data.centurias && data.centurias.map(({ name, id }, index) => (
          <MenuItem key={index} value={id}>{ name }</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CenturiaDropdown;