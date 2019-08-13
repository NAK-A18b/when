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

import { USERS } from '../connections';

import { generateCacheUpdate } from '../../utils/graphql';

import './styles.css';

const baseClassName = 'create-user'

const CREATE_USER = gql`
  mutation createUser($username: String!, $tel: String!, $centuria: String!) {
    createUser(username: $username, tel: $tel, centuria: $centuria) {
      id
      username
      tel
      centuria {
        id
        name
        semester
      }
      connections {
        id
        start {
          name
        }
        end {
          name
        }
      }
    }
  }
`;

export const CENTURIAS = gql`
  query getCenturias {
    centurias {
      id
      name
    }
  }
`

const CreateUser = () => {
  const { loading, data } = useQuery(CENTURIAS);
  const [addUser] = useMutation(
    CREATE_USER,
    generateCacheUpdate('createUser', USERS, 'users')
  );

  const [username, setUsername] = useState('');
  const [tel, setTel] = useState('');
  const [centuria, setCenturia] = useState('');

  const handleInput = stateFunc => e => stateFunc(e.target.value);
  const submitForm = () => {
    addUser({
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
          Create User
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
        <FormControl variant="outlined" className={`${baseClassName}-centuria-dropdown`}>
          <InputLabel htmlFor="age-simple">Zenturie</InputLabel>
          <Select
            input={<OutlinedInput labelWidth={60} name="age" id="outlined-age-simple" />}
            className="centuria-select"
            value={centuria}
            onChange={handleInput(setCenturia)}
          >
            { !loading && data.centurias && data.centurias.map(({ name, id }, index) => (
              <MenuItem key={index} value={id}>{ name }</MenuItem>
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

export default CreateUser;
