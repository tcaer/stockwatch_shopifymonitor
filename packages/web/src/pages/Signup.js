import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../store/actions';

class SignupPage extends Component {

  state = {
    email: '',
    password: '',
    name: ''
  }

  onSubmit = (e) => {
    e.preventDefault();

    let email = this.state.email;
    let name = this.state.name;
    let password = this.state.password;

    let user = {
      email,
      name,
      password
    };

    this.props.dispatchSignupUser(user);
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
          <input name='name' 
            placeholder='name'
            onChange={this.onChange} />
          <input name='password' 
            placeholder='password'
            type='password'
            onChange={this.onChange} />
          <button>Submit</button>
        </form>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    dispatchSignupUser: user => {
      dispatch(signupUser(user));
    }
  }
}

export default connect(null, mapDispatchToProps)(SignupPage);