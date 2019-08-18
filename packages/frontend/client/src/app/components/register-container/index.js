import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withUser } from '../../context/user';

import CenturiaDropdown from '../centuria-dropdown';

import './styles.css';

const baseClassName = 'register-container';

const RegisterContainer = (props) => {
  const { user } = props

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ tel, setTel ] = useState('');
  const [ centuria, setCenturia ] = useState('');

  const handleInput = e => setCenturia(e.target.value);
  const register = () => user.register(email, password, username, tel, centuria)
  return (
    <div className={`${baseClassName}-inputs`}>
      <div className={`${baseClassName}-inputs-row`}>
        <div className={`${baseClassName}-inputs-textfield`}>
          <TextField 
            type='text' 
            variant="outlined"
            label='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={`${baseClassName}-inputs-textfield`}>
          <TextField 
            type='text'
            variant="outlined"
            label='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div className={`${baseClassName}-inputs-row`}>
        <div className={`${baseClassName}-inputs-textfield`}>
          <TextField 
            type='text'
            variant="outlined"
            label='Telephone number'
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
        <div className={`${baseClassName}-inputs-textfield`}>
          <CenturiaDropdown value={ centuria } changeCallback={handleInput} />
        </div>
      </div>
      <div className={`${baseClassName}-submit-button`}>  
        <Button onClick={register} color="primary" variant="contained">Register</Button>
      </div>
    </div>
  )
}

export default withUser(RegisterContainer);