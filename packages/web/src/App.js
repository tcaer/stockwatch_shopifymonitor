import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import GatedRoute from './components/routes/GatedRoute';

const SignupPageLoadable = Loadable({
  loader: () => import('./pages/signup/Signup'),
  loading: () => (<div>Loading...</div>)
});
const LoginPageLoadable = Loadable({
  loader: () => import('./pages/login/Login'),
  loading: () => (<div>Loading...</div>)
});
const DashboardPageLodable = Loadable({
  loader: () => import('./pages/dashboard/Dashboard'),
  loading: () => (<div>Loading...</div>)
});

class App extends Component {

  render() {
    return (
      <Switch>
        <GatedRoute exact 
          path='/signup' 
          condition={!this.props.isLoggedIn}
          component={SignupPageLoadable}
          redirect='/@me' />
        <GatedRoute exact
          path='/login'
          condition={!this.props.isLoggedIn}
          component={LoginPageLoadable}
          redirect='/@me' />
        <GatedRoute path='/@me'
          condition={this.props.isLoggedIn}
          component={DashboardPageLodable}
          redirect='/login' />
      </Switch>
    )
  }

}

const isUserLoggedIn = (user) => {
  return user.jwt != null;
}

const mapStateToProps = state => {
  return {
    isLoggedIn: isUserLoggedIn(state.user)
  }
};

export default connect(mapStateToProps)(App);