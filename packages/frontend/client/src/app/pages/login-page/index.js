import React, {useState} from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import red from '@material-ui/core/colors/red';
import {Divider} from '@material-ui/core';

import AuthenticationContainer from '../../components/authentication-container';
import LoginContainer from '../../components/login-container';

import {withUser} from '../../context/user';
import {ERRORS} from '../../constants';

import './styles.css';

const baseClassName = 'login-page';

const LoginPage = (props) => {
  const {user} = props;

  const [auth, setAuth] = useState(false);
  const [error, setError] = useState('');
  const [tel, setTel] = useState('');
  const [token, setToken] = useState('');

  const triggerAuth = () => {
    user.triggerAuthentication(tel).then(() => {
      setAuth(true);
    }).catch(e => {
      Object.entries(e.graphQLErrors[0].extensions.exception).map((k, v) => {
        if (k[0] !== 'stacktrace') {
          setError(ERRORS[k[0]]);
        }
      });
    });
  };

  const loginUser = () => {
    user.login(tel, parseInt(token));
  }
  return (
      <Card className={`${baseClassName}-card`}>
        <div className={`${baseClassName}-headline`}>
          <Typography variant="h5">
            {'Login'}
          </Typography>
        </div>
        <Divider/>
        {auth ? (
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
        <Divider/>
        {error ? (
            <CardContent>
              <Typography variant="body2" color="error" component="p">
                {error}
              </Typography>
            </CardContent>
        ) : (
            <div>{null}</div>
        )

        }
      </Card>
  )
}

export default withUser(LoginPage);