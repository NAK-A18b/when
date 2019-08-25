import React from 'react';

import Sidebar from './components/sidebar';

import DelayPage from './pages/delay-page';
import ConnectionPage from './pages/connection-page';
import LoginPage from './pages/login-page';

import { withUser } from './context/user';

import './styles.css';

const PAGE_PARAM_NAME = 'page';

class App extends React.Component {

  pageWrapper = React.createRef();
  state = {
    pageIndex: 0
  };

  componentDidMount = () => {
    this.persistPath();
  }

  componentDidUpdate = () => {
    this.persistPage();
  }

  persistPath = () => {
    const currentPath = this.currentPage();
    this.setState({
      pageIndex: currentPath ? currentPath : 0,
    });
  }

  persistPage = () => {
    if (this.pageWrapper.current) {
      this.pageWrapper.current.style.top = `calc(-${this.currentPage()} * 100%)`
    }
  }

  changePage = index => {
    const url = new URL(window.location);
    url.searchParams.set(PAGE_PARAM_NAME, index.toString());
    window.history.pushState({}, '', url);
    this.persistPath();
  }

  currentPage = () => {
    const url = new URL(window.location);
    return parseInt(url.searchParams.get(PAGE_PARAM_NAME));
  }

  render = () => {
    const { user } = this.props;
    const { pageIndex } = this.state;
    if (user.loading) return <div className={`background`}></div>;

    return (
      <>
        <div className={`background`}>
        { user.loggedIn ? 
          (
            <>
              <Sidebar 
                navigationCallback={ this.changePage }
                pageIndex={ pageIndex }
                user={ user }
              />
              <div className={ 'page-container' }>
                <div 
                  ref={ this.pageWrapper }
                  className={ 'page-wrapper' }
                >
                  <div className={ 'page' }>
                    <DelayPage />
                  </div>
                  <div className={ 'page' }>
                    <ConnectionPage />
                  </div>
                </div>
              </div>
            </>
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
