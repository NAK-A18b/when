import React from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './styles.css';

const baseClassName = 'auth-container';

const AuthenticationContainer = (props) => {
  const { token, setToken, submitCallback } = props;

  return (
    <div className={`${baseClassName}-wrapper`}>
      <div className={`${baseClassName}-headline`}>
        <Typography variant="h5">
          {'Submit Token'}
        </Typography>
      </div>
      <div className={`${baseClassName}-textfield`}>
        <TextField 
          type='number' 
          variant="filled"
          label='Token' 
          value={token} 
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <div className={`${baseClassName}-submit-button`}>  
        <Button 
          onClick={submitCallback}
          color="primary"
          variant="contained"
        >
          { 'Submit' }
        </Button>
      </div>
    </div>
  )
}

export default AuthenticationContainer;