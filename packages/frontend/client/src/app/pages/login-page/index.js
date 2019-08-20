import React, {useState} from 'react';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import AuthenticationContainer from '../../components/authentication-container';
import LoginContainer from '../../components/login-container';
import ChatBubble from '../../components/chat-bubble';
import green from '@material-ui/core/colors/green';


import {withUser} from '../../context/user';
import {ERRORS} from '../../constants';

import './styles.css';

const baseClassName = 'login-page';


const LoginPage = (props) => {
  const {user} = props;

  const [ clouds, setCloud ] = useState([0, 1]);
  const [ auth, setAuth ] = useState(false);
  const [ error, setError ] = useState('');
  const [ tel, setTel ] = useState('');
  const [ token, setToken ] = useState('');

  const triggerAuth = () => {
    user.triggerAuthentication(tel).then(() => {
      setAuth(true);
      setError('');
    }).catch(e => {
      e.graphQLErrors.forEach(gqlError => {
        const { exception } = gqlError.extensions;
        const error = ERRORS.find(e => exception[e.name]);
        if (error) { setError(error.text); }
      })
    });
  };
  const loginUser = () => {
    user.login(tel, parseInt(token));
  }
  return (
    <Card className={`${baseClassName}-card`}>
      <section className="stage">
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="train">
            <div className="wagon"></div>
            <div className="wagon"></div>
            <div className="wagon"></div>
            <div className="locomotive">
              <div className="cabin"></div>
              <div className="motor"></div>
              <div className="chimney">
                <div className="smoke"></div>
              </div>
              <div className="light"></div>
            </div>
          </div>
        </section>
      <div className={`${baseClassName}-wrapper`}>
        <div className={`${baseClassName}-slider-wrapper${auth ? '--auth' : ''}`}>
          <LoginContainer
            tel={tel}
            setTel={setTel}
            disabled={auth}
            submitCallback={triggerAuth}
          />
          <AuthenticationContainer
            token={token}
            setToken={setToken}
            submitCallback={loginUser}
          />
        </div>
      </div>
    </Card>
  )
}

export default withUser(LoginPage);

{/* <div>
      
        <div>
          {auth ? (
            
          ) : (
            
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
        </div>
      </Card>
    </div> */}