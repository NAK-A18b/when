import React, {useState} from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';


import AuthenticationContainer from '../../components/authentication-container';
import LoginContainer from '../../components/login-container';
import ChatBubble from '../../components/chat-bubble';
import green from '@material-ui/core/colors/green';


import {withUser} from '../../context/user';
import {ERRORS} from '../../constants';

import './styles.css';
import TextField from "@material-ui/core/TextField";

const baseClassName = 'login-page';

const useStyles = makeStyles(theme => ({
  button: {
    marginLeft: theme.spacing(1),
    backgroundColor: 'green',
  },
  iconSmall: {
    fontSize: 20,
  },
}));

const LoginPage = (props) => {
  const {user} = props;

  const classes = useStyles();

  const [auth, setAuth] = useState(false);
  const [error, setError] = useState('');
  const [tel, setTel] = useState('');
  const [token, setToken] = useState('');

  const triggerAuth = () => {
    user.triggerAuthentication(tel).then(() => {
      setAuth(true);
      setError('');
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
      <div>
        <ChatBubble from="WHEN" time="21:21">Bitte gebe deine Telefonnummer ein, damit du einen Anmeldecode erhalten
          kannst</ChatBubble>
        <ChatBubble direction="right" from="You" time="21:21">
          <div className={`${baseClassName}-inputs`}>
            <br/>
            <div className={`${baseClassName}-inputs-textfield`}>
              <TextField
                  type='tel'
                  variant="outlined"
                  label='Mobile phone number'
                  value={tel}
                  onChange={(e) => setTel(e.target.value)}
              />
              <Fab color="primary" aria-label="send" className={classes.button}>
                <Icon onClick={triggerAuth} className={classes.rightIcon}>send</Icon>
              </Fab>
            </div>
          </div>
        </ChatBubble>
        {error ? (
            <ChatBubble from="WHEN" time="21:21">{error}</ChatBubble>
        ) : (
            <div>{null}</div>
        )
        }
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
      </div>
  )
}

export default withUser(LoginPage);