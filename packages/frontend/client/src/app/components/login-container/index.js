import React, { useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { withUser } from '../../context/user';

import './styles.css';

const baseClassName = 'login-container';


const LoginContainer = (props) => {
  const { tel, setTel, submitCallback } = props;
  
  return (
    <div>
      <div className={`${baseClassName}-inputs`}>
        <div className={`${baseClassName}-inputs-textfield`}>
          <TextField 
            type='text' 
            variant="outlined"
            label='Tel' 
            value={tel} 
            onChange={(e) => setTel(e.target.value)}
          />
        </div>
      </div>
      <div className={`${baseClassName}-submit-button`}>  
        <Button 
          onClick={submitCallback}
          color="primary"
          variant="contained"
        >
          { 'Login' }
        </Button>
      </div>
    </div>
  )
}

export default LoginContainer;