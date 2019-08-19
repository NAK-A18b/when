import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Divider } from '@material-ui/core';

import AuthenticationContainer from '../../components/authentication-container';
import LoginContainer from '../../components/login-container';

import { withUser } from '../../context/user';

import './styles.css';

const baseClassName = 'login-page';

const LoginPage = (props) => {
  const { user } = props;

  const [ auth, setAuth ] = useState(false);
  const [ tel, setTel ] = useState('');
  const [ token, setToken ] = useState('');
  
  const triggerAuth = () => {
    setAuth(true);
    user.triggerAuthentication(tel);
  }

  const loginUser = () => {
    user.login(tel, parseInt(token));
  }
  return (
    <Card className={`${baseClassName}-card`}>
        <div className={`${baseClassName}-headline`}>
          <Typography variant="h5">
            { 'Login' }
          </Typography>
        </div>
        <Divider />
        { auth ? (
          <AuthenticationContainer 
            token={token}
            setToken={setToken}
            submitCallback={loginUser}
          />
        ) : (
          <LoginContainer 
            tel={tel} 
            setTel={setTel} 
            submitCallback={triggerAuth}/>
        )}
    </Card>
  )
}

export default withUser(LoginPage);