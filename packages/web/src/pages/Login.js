import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinUser } from '../store/actions';

class LoginPage extends Component {

  state = {
    email: '',
    password: ''
  }

  onSubmit = (e) => {
    e.preventDefault();

    let email = this.state.email;
    let password = this.state.password;

    let user = {
      email,
      name,
      password
    };

    this.props.dispatchSigninUser(user);
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input name='email' 
            placeholder='email'
            onChange={this.onChange} />
          <input name='password' 
            placeholder='password'
            type='password'
            onChange={this.onChange} />
          <button>Login</button>
        </form>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    dispatchSigninUser: user => {
      dispatch(signinUser(user));
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginPage);