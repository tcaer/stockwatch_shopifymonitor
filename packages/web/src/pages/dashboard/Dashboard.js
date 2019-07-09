import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '@/store/actions';

class DashboardPage extends Component {

  render() {
    if (this.props.user) {
      return (
        <div>
          {this.props.user.email || ''}
          <button onClick={this.props.logoutUser}></button>
        </div>
      );
    }

    return <div>loading...</div>
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