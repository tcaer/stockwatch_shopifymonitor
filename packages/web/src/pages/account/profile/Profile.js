import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './style.scss';

class ProfilePage extends Component {

  render() {
    const memberSince = new Date(this.props.user.created_at);
    return (
      <section className={styles.main}>
        <div className={styles.box + ' ' + styles.profile_box}>
          <div>
            <h3>{this.props.user.firstName} {this.props.user.lastName}</h3>
            <p>Email: {this.props.user.email} </p>
            <p>Member since: {memberSince.getMonth() + 1}/{memberSince.getDate()}/{memberSince.getFullYear()}</p>
            <p>Max monitors: {this.props.user.maxMonitors}</p>
          </div>
          <div>
            <button className={styles.action_button}>Edit Profile</button>
          </div>
        </div>
        <div className={styles.box + ' ' + styles.password_box}>
          <div>
            <h3>Password</h3>
            <p>•••••••••••••</p>
          </div>
          <div>
            <button className={styles.action_button}>Reset Password</button>
          </div>
        </div>
        <div className={styles.box + ' ' + styles.deactivate_box}>
          <div>
            <h3>Deactivate Account</h3>
            <p>This will fully delete your account from our system.</p>
          </div>
          <div>
            <button className={styles.action_button + ' ' + styles.red}>Deactivate Account</button>
          </div>
        </div>
      </section>
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.user.info || {}
  }
}

export default connect(mapStateToProps, null)(ProfilePage);