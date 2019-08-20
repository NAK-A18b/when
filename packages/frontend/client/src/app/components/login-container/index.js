import React from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './styles.css';

const baseClassName = 'login-container';


const LoginContainer = (props) => {
  const { disabled, tel, setTel, submitCallback } = props;
  
  return (
    <div className={`${baseClassName}-wrapper`}>
      <div className={`${baseClassName}-headline`}>
        <Typography variant="h5">
          {'Login'}
        </Typography>
      </div>
      <div className={`${baseClassName}-inputs-textfield`}>
        <TextField 
          disabled={disabled}
          className={`${baseClassName}-textfield`}
          type='number'
          variant="filled"
          label='Mobile phone number'
          value={tel} 
          onChange={(e) => setTel(e.target.value)}
        />
      </div>
      <div className={`${baseClassName}-submit-button`}>  
        <Button 
          onClick={submitCallback}
          disabled={disabled}
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