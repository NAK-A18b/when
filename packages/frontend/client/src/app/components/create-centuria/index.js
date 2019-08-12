import React, { useState } from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './styles.css';

const baseClassName = 'create-centuria'

const CREATE_CENTURIA = gql`
  mutation createCenturia($name: String!, $semester: Int!) {
    createCenturia(name: $name, semester: $semester) {
      id
      name
      semester
    }
  }
`;

const CreateCenturia = () => {
  const [addCenturia] = useMutation(CREATE_CENTURIA);

  const [name, setName] = useState('');
  const [semester, setSemester] = useState('');

  const handleInput = stateFunc => e => stateFunc(e.target.value);
  const submitForm = () => {
    addCenturia({
      variables: {
        name,
        semester: parseInt(semester),
      }
    }).then( () => {
      setName('');
      setSemester('');
    })
  }

  return (
    <Card className={`${baseClassName}-card`}>
      <div className={`${baseClassName}-head`}>
        <Typography variant="h5">
          Create Centuria
        </Typography>
      </div>
      <Divider />
      <div className={`${baseClassName}-body`}>
        <div className={`${baseClassName}-body-inputs`}>
          <div className={`${baseClassName}-body-inputs-textfield`}>
            <TextField 
              type='text' 
              variant="outlined"
              label='Name (e.g. A18b)' 
              name='name' 
              value={name} 
              onChange={handleInput(setName)}
            />
          </div>
          <div className={`${baseClassName}-body-inputs-textfield`}>
            <TextField 
              type='number'
              variant="outlined"
              label='Semester'
              name='semester'
              value={semester}
              onChange={handleInput(setSemester)}
            />
          </div>
        </div>
        <div className={`${baseClassName}-body-button`}>
          <Button onClick={submitForm} variant="contained" color="primary" >Create</Button>
        </div>
      </div>
    </Card>
  );
}

export default CreateCenturia;
