import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import styles from './style.scss';


class HeaderComponent extends Component {

  static defaultProps = {
    firstName: '',
    lastName: '',
    email: ''
  }

  state = {
    searchPlaceholder: '',
    platform: '',
    searchValue: ''
  }

  componentDidMount() {
    let platform = navigator.appVersion;
    let searchPlaceholder = 'Search by resource name ';

    if (platform.indexOf('Win') != -1) {
      platform = 'Windows';
      searchPlaceholder += '(Ctrl + Enter)';
    } else if (platform.indexOf('Mac') != -1) {
      platform = 'MacOS';
      searchPlaceholder += '(Cmd + Enter)';
    } else if (platform.indexOf('Linux') != -1) {
      platform = 'Linux';
      searchPlaceholder += '(Ctrl + Enter)';
    }

    this.setState({platform, searchPlaceholder});

    window.addEventListener('keydown', this.checkKeyCommand);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.checkKeyCommand);
  }

  checkKeyCommand = (e) => {
    // Check to see if cmd on mac, or ctrl on windows/linux has been pressed
    let cKeyPressed = false;

    if (this.state.platform == 'Windows' || this.state.platform == 'Linux') {
      cKeyPressed = e.ctrlKey;
    } else {
      cKeyPressed = e.metaKey;
    }

    if (cKeyPressed && e.keyCode == 13) {
      this.searchInput.focus();
    }
  }

  checkToRedirect = () => {
    if (this.state.searchValue.length > 0) {
      this.props.history.push('/@me/search');
    }
  }

  onSearchInputChange = (e) => {
    this.setState({searchValue: e.target.value}, this.checkToRedirect);
  }

  render() {
    return (
      <header className={styles.header}>
        <div className={styles.header_inner}>
          <Link to='/@me' className={styles.header_icon}>Stock Watch</Link>
          <div className={styles.search_container} 
            ref={(container) => this.searchContainer = container}>
            <div className={styles.input_container}>
            <div className={styles.input_bar}></div>
              <input placeholder={this.state.searchPlaceholder}
                ref={(input) => this.searchInput = input}
                value={this.state.searchValue}
                onChange={this.onSearchInputChange} />
            </div>
          </div>
          
        </div>
        { this.props.firstName }
      </header>
    );
  }

}

export default withRouter(HeaderComponent);