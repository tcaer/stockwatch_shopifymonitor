import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '@/store/actions';

import HeaderComponent from '../../components/header/Header';

const Test = (props) => (
  <p>Search!</p>
)

class DashboardPage extends Component {

  componentDidMount() {
    document.title = 'Stock Watch | Dashboard';
  }

  render() {
    return (
      <>
        <HeaderComponent firstName={this.props.user.firstName || null}
          lastName={this.props.user.lastName || null}
          email={this.props.user.email || null} />
        <Route path={`${this.props.match.url}/search`} component={Test} />
      </>
    );
  }

}

const mapStateToProps = state => {
  return {
    user: state.user.info
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);