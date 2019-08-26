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
    let currentPath = this.currentPage();
    if (!currentPath) {
      this.changePage(0);
      currentPath = this.currentPage();
    }

    this.setState({
      pageIndex: currentPath,
    });
  }

  persistPage = () => {
    if (!this.pageWrapper.current) return;
    this.pageWrapper.current.style.top = `calc(-${this.currentPage()} * 100%)`
  }

  changePage = index => {
    const url = new URL(window.location);
    url.searchParams.set(PAGE_PARAM_NAME, index.toString());
    window.history.pushState({}, '', url);
  }

  updatePage = index => {
    this.changePage(index);
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
                navigationCallback={ this.updatePage }
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
