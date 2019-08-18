import React from 'react';

import CreateUser from './components/create-user';
import CreateConnection from './components/create-connection';
import CreateCenturia from './components/create-centuria';
import Connections from './components/connections';
import AuthenticationContainer from './components/authentication-container';

import { authToken } from './utils/authentication';

import LoginPage from './pages/login-page';

import { withUser } from './context/user';

import './styles.css';
import { Button } from '@material-ui/core';

class App extends React.Component {

  render = () => {
    const { user } = this.props
    if (user.loading) {
      return  <div className={`background`}></div>
    }

    return (
      <div className={`background`}>
        { user.loggedIn ? 
          (
            <div>
              <div className="page">
                <Connections />
                <div className="create-forms">
                  <CreateUser />
                  <CreateConnection />
                  <CreateCenturia />
                </div>
              </div>
              <Button onClick={ user.logout }>Logout</Button>
            </div>
          ) : (
            <LoginPage />
          )
        }
      </div>
    )
    
  }
}

export default withUser(App);
