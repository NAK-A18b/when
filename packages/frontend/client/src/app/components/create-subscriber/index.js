import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './styles.css';

const baseClassName = 'create-subscriber'

const CREATE_SUBSCRIBER = gql`
  mutation createSubscriber($username: String!, $tel: String!, $centuria: String!) {
    createSubscriber(username: $username, tel: $tel, centuria: $centuria) {
      id
      username
      tel
      centuria {
        id
        name
        semester
      }
    }
  }
`;

const CENTURIAS = gql`
  query GetCenturias {
    centurias {
      name
    }
  }
`

const CreateSubscriber = () => {
  const { loading, data } = useQuery(CENTURIAS);
  const [addSubscriber] = useMutation(CREATE_SUBSCRIBER);

  const [username, setUsername] = useState('');
  const [tel, setTel] = useState('');
  const [centuria, setCenturia] = useState('');

  const handleInput = stateFunc => e => stateFunc(e.target.value);
  const submitForm = () => {
    addSubscriber({
      variables: {
        username,
        tel,
        centuria,
      }
    }).then( () => {
      setCenturia('');
      setTel('');
      setUsername('');
    })
  }

  return (
    <Card className={`${baseClassName}-card`}>
      <div className={`${baseClassName}-head`}>
        <Typography variant="h5">
          Create Subscriber
        </Typography>
      </div>
      <Divider />
      <div className={`${baseClassName}-body`}>
        <div className={`${baseClassName}-body-inputs`}>
          <div className={`${baseClassName}-body-inputs-textfield`}>
            <TextField 
              type='text' 
              variant="outlined"
              label='Username' 
              name='name' 
              value={username} 
              onChange={handleInput(setUsername)}
            />
          </div>
          <div className={`${baseClassName}-body-inputs-textfield`}>
            <TextField 
              type='tel'
              variant="outlined"
              label='Phone'
              name='phone'
              value={tel}
              onChange={handleInput(setTel)}
            />
          </div>
        </div>
        <FormControl variant="outlined">
          <InputLabel htmlFor="age-simple">Zenturie</InputLabel>
          <Select
            input={<OutlinedInput labelWidth={60} name="age" id="outlined-age-simple" />}
            className="centuria-dropdown"
            value={centuria}
            onChange={handleInput(setCenturia)}
          >
            { !loading && data.centurias.map(({ name }, index) => (
              <MenuItem key={index} value={name}>{ name }</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={`${baseClassName}-body-button`}>
          <Button onClick={submitForm} variant="contained" color="primary" >Create</Button>
        </div>
      </div>
    </Card>
  );
}

export default CreateSubscriber;
