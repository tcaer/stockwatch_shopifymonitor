import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './style.scss';

class BillingPage extends Component {

  render() {
    return (
      <section className={styles.main}>
        <div className={styles.box}>
          <div>
            <h3>Current amount due</h3>
            <p>Your primary card will be charged once every month</p>
          </div>
          <div>
            <h3>${this.props.user.balance.toFixed(2)}</h3>
          </div>
        </div>
        <div className={styles.box}>
          <div>
            <h3>Payment methods</h3>
            <p>You must have at least one card on file to use our services</p>
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

export default connect(mapStateToProps, null)(BillingPage);