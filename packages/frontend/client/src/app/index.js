import React from 'react';

import Sidebar from './components/sidebar';

import DelayPage from './pages/delay-page';
import LoginPage from './pages/login-page';
import AllConnectionsPage from './pages/all-connections-page';
import MyConnectionsPage from './pages/my-connections-page';

import { withUser } from './context/user';

import './styles.css';
import SelectCenturia from './components/select-centuria';
import SettingsPage from './pages/settings-page';

const PAGE_PARAM_NAME = 'page';
const NUMBER_OF_PAGES = 4;

class App extends React.Component {
  pageWrapper = React.createRef();
  state = {
    pageIndex: 0
  };

  componentDidMount = () => {
    this.persistPath();
    window.addEventListener('keyup', this.handleArrowClick);
  };

  componentDidUpdate = () => this.persistPage();

  handleArrowClick = event => {
    const { code } = event;
    const { pageIndex } = this.state;

    if (code === 'ArrowUp') {
      this.updatePage(pageIndex - 1);
    } else if (code === 'ArrowDown') {
      this.updatePage(pageIndex + 1);
    }
  };

  persistPath = () => {
    let currentPath = this.currentPage();
    if (!currentPath) {
      this.changePage(0);
      currentPath = this.currentPage();
    }

    this.setState({
      pageIndex: currentPath
    });
  };

  persistPage = () => {
    if (!this.pageWrapper.current) return;
    this.pageWrapper.current.style.top = `calc(-${this.currentPage()} * 100%)`;
  };

  changePage = index => {
    if (index < 0 || index >= NUMBER_OF_PAGES) return;
    const url = new URL(window.location);
    url.searchParams.set(PAGE_PARAM_NAME, index.toString());
    window.history.pushState({}, '', url);
  };

  updatePage = index => {
    this.changePage(index);
    this.persistPath();
  };

  currentPage = () => {
    const url = new URL(window.location);
    return parseInt(url.searchParams.get(PAGE_PARAM_NAME));
  };

  render = () => {
    const { user } = this.props;
    const { pageIndex } = this.state;
    if (user.loading) return <div className={`background`}></div>;

    return (
      <>
        <div className={`background`}>
          {user.loggedIn && user.data && user.data.centuria ? (
            <>
              <Sidebar
                navigationCallback={this.updatePage}
                pageIndex={pageIndex}
                user={user}
              />
              <div className={'page-container'}>
                <div ref={this.pageWrapper} className={'page-wrapper'}>
                  <div className={'page'}>
                    <DelayPage />
                  </div>
                  <div className={'page'}>
                    <AllConnectionsPage user={user} />
                  </div>
                  <div className={'page'}>
                    <MyConnectionsPage />
                  </div>
                  <div className={'page'}>
                    <SettingsPage user={user} />
                  </div>
                </div>
              </div>
            </>
          ) : user.loggedIn && !user.centuria ? (
            <div className='select-centuria-wrapper'>
              <SelectCenturia user={user} />
            </div>
          ) : (
            <LoginPage />
          )}
        </div>
      </>
    );
  };
}

export default withUser(App);
