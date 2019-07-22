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
        <HeaderComponent firstName={this.props.user.firstName || null}
          lastName={this.props.user.lastName || null}
          email={this.props.user.email || null}
          billingValue={this.props.user.balance || null} />
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