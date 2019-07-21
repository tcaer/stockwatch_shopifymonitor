import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '@/store/actions';

import styles from './style.scss';

class AccountPage extends Component {

  render() {
    return (
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Account</h1>
          <span onClick={this.props.logoutUser}>Logout</span>
        </header>
        <section className={styles.tabs}>
          <NavLink to='/@me/account/profile' activeClassName={styles.active}>Profile</NavLink>
          <NavLink to='/@me/account/billing' activeClassName={styles.active}>Billing</NavLink>
          <NavLink to='/@me/account/referrals' activeClassName={styles.active}>Referrals</NavLink>
        </section>
        <section>
          <Route path={`${this.props.match.url}/profile`} component={() => <div></div>} />
        </section>
      </main>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(null, mapDispatchToProps)(AccountPage);