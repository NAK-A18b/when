import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Divider } from '@material-ui/core';

import AuthenticationContainer from '../../components/authentication-container';
import LoginContainer from '../../components/login-container';
import RegisterContainer from '../../components/register-container';

import { withUser } from '../../context/user';

import './styles.css';

const baseClassName = 'login-page';

const LoginPage = (props) => {
  const { user } = props;
  const [ login, setLogin ] = useState(true);
  const toggleLogin = (state) => () => setLogin(state);

  return (
    <Card className={`${baseClassName}-card`}>
    { user.auth ? (
      <AuthenticationContainer /> 
    ) : (
      <>
        <div className={`${baseClassName}-headline`}>
          <Typography variant="h5">
            { login ? 'Login' : 'Register'}
          </Typography>
          <ButtonGroup className={`${baseClassName}-mode-switch`} color="primary">
            <Button variant="contained" onClick={toggleLogin(true)}>Login</Button>
            <Button variant="contained" onClick={toggleLogin(false)}>Register</Button>
          </ButtonGroup>
        </div>
        <Divider />
        { login ? (
          <LoginContainer />
        ) : (
          <RegisterContainer />
        )}
      </>
    )}
    </Card>
  )
}

export default withUser(LoginPage);