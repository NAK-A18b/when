import React, { useState } from 'react';

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
import Sidebar from './components/sidebar';

class App extends React.Component {

  state = {
    pageIndex: 0
  }

  setPageIndex = index => {
    this.setState({
      pageIndex: index
    })
  }
  
  render = () => {
    const { user } = this.props;
    const { pageIndex } = this.state;
    if (user.loading) return  <div className={`background`}></div>;

    return (
      <>
        <Sidebar 
          navigationCallback={this.setPageIndex}
          pageIndex={pageIndex} />
        <div className={`background`}>
        { user.loggedIn ? 
          (
            <div>
              <div className="page">
                <Connections currentUser={ user }/>
                <div className="create-forms">
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
      </>
    )
    
  }
}

export default withUser(App);
