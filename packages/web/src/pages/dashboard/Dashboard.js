import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import HeaderComponent from '@/components/header/Header';

const AccountPageLoadable = Loadable({
  loader: () => import('../account/Account'),
  loading: () => (<div>...loading</div>)
});

class DashboardPage extends Component {

  componentDidMount() {
    document.title = 'Stock Watch | Dashboard';
  }

  render() {
    return (
      <>
        <HeaderComponent billingValue={this.props.user.balance} />
        <Route path={`${this.props.match.url}/account`} component={AccountPageLoadable} />
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.user.info || {}
  }
}

export default connect(mapStateToProps, null)(DashboardPage);