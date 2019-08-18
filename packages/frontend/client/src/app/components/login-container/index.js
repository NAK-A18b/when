import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withUser } from '../../context/user';

import './styles.css';

const baseClassName = 'login-container';


const LoginContainer = (props) => {
  const { user } = props;
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  
  const login = () => user.login(email, password);
  return (
    <div>
      <div className={`${baseClassName}-inputs`}>
        <div className={`${baseClassName}-inputs-textfield`}>
          <TextField 
            type='text' 
            variant="outlined"
            label='Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className={`${baseClassName}-submit-button`}>  
        <Button 
          onClick={login}
          color="primary"
          variant="contained"
        >
          { 'Login' }
        </Button>
      </div>
    </div>
  )
}

export default withUser(LoginContainer);