import React, { useState } from 'react';

import Card from '@material-ui/core/Card';

import AuthenticationContainer from '../../components/authentication-container';
import LoginContainer from '../../components/login-container';

import { withUser } from '../../context/user';
import { ERRORS } from '../../constants';

import './styles.css';

const baseClassName = 'login-page';

const LoginPage = props => {
  const { user } = props;

  const [clouds, setCloud] = useState([0, 1]);
  const [auth, setAuth] = useState(false);
  const [error, setError] = useState('');
  const [tel, setTel] = useState('');
  const [token, setToken] = useState('');

  const triggerAuth = () => {
    if (!tel) return;
    user
      .triggerAuthentication(tel)
      .then(formattedTel => {
        setTel(formattedTel);
        setAuth(true);
        setError('');
      })
      .catch(e => {
        e.graphQLErrors.forEach(gqlError => {
          const { exception } = gqlError.extensions;
          const error = ERRORS.find(e => exception[e.name]);
          if (error) {
            setError(error.text);
          }
        });
      });
  };

  const loginUser = () => {
    user.login(tel, parseInt(token));
  };
  const removeCloud = index => () => setCloud(clouds.filter(c => c !== index));

  return (
    <Card className={`${baseClassName}-card`}>
      <section className='stage'>
        <div className='sun'></div>
        {clouds.includes(0) && (
          <div onClick={removeCloud(0)} className='cloud one'></div>
        )}
        {clouds.includes(1) && (
          <div onClick={removeCloud(1)} className='cloud two'></div>
        )}
        <div className='train'>
          <div className='wagon'>
            <div className='window-left'></div>
            <div className='window-left'></div>
            <div className='window-right'></div>
            <div className='window-right'></div>
          </div>
          <div className='wagon'>
            <div className='window-left'></div>
            <div className='window-left'></div>
            <div className='window-right'></div>
            <div className='window-right'></div>
          </div>
          <div className='wagon'>
            <div className='window-left'></div>
            <div className='window-left'></div>
            <div className='window-right'></div>
            <div className='window-right'></div>
          </div>
          <div className='locomotive'>
            <div className='cabin'></div>
            <div className='motor'></div>
            <div className='chimney'>
              <div className='smoke'></div>
            </div>
            <div className='light'></div>
          </div>
        </div>
      </section>
      <div className={`${baseClassName}-wrapper`}>
        <div
          className={`${baseClassName}-slider-wrapper${auth ? '--auth' : ''}`}
        >
          {error}
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
  );
};

export default withUser(LoginPage);
