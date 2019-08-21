import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { generateCacheUpdate } from '../../utils/graphql';

import './styles.css';
import CenturiaDropdown from '../centuria-dropdown';

const baseClassName = 'create-user'

const USERS = gql`
  query users {
    users {
      id
      tel
      connections {
        id
      }
    }
  }
`


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

const CreateUser = () => {
  const [addUser] = useMutation(
    CREATE_USER,
    generateCacheUpdate('createUser', USERS, 'users')
  );

  const [username, setUsername] = useState('');
  const [tel, setTel] = useState('');
  const [centuria, setCenturia] = useState('');
  const [mutationLoading, setLoading] = useState(false);

  const handleInput = stateFunc => e => stateFunc(e.target.value);
  const submitForm = () => {
    addUser({
      variables: {
        username,
        tel,
        centuria,
      }
    }).then( () => {
      setLoading(false);
      setCenturia('');
      setTel('');
      setUsername('');
    })
    setLoading(true);
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
        <div className={`${baseClassName}-body-inputs-textfield`}>
          <CenturiaDropdown value={ centuria } changeCallback={ handleInput(setCenturia) } />
        </div>
        <div className={`${baseClassName}-body-button`}>
          <Button onClick={submitForm} variant="contained" color="primary" >Create</Button>
          { mutationLoading && <CircularProgress className={`${baseClassName}-loader`} /> }
        </div>
      </div>
    </Card>
  );
}

export default CreateUser;
