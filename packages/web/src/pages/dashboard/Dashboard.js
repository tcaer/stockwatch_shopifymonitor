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
        <HeaderComponent />
        <Route path={`${this.props.match.url}/search`} component={Test} />
      </>
    )
    /*if (this.props.user) {
      return (
        <>
          {this.props.user.email || ''}
          <button onClick={this.props.logoutUser}></button>
        </>
      );
    }

    return <div>loading...</div>*/
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