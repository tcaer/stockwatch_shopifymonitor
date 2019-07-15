import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signinUser } from '@/store/actions';

import styles from './style.scss';

class LoginPage extends Component {

  state = {
    email: '',
    password: '',
    formErrors: {email: '', password: ''},
    emailValid: false,
    passwordValid: false,
    formValid: false,
    hasFocus: {email: false, password: false}
  }

  componentDidMount() {
    document.title = 'Stock Watch | Log in'
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

    if (this.state.formValid) {
      this.props.dispatchSigninUser(user);
    }
  }

  validateForm = () => {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  validateField = (fieldName, value) => {
    let fieldValdiationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
        fieldValdiationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValdiationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }

    this.setState({formErrors: fieldValdiationErrors, 
      emailValid, 
      passwordValid}, 
      this.validateForm);
  }

  onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({[name]: value},
      () => this.validateField(name, value));
  }

  toggleFocus = (fieldName, value) => {
    let hasFocus = this.state.hasFocus;

    switch (fieldName) {
      case 'email':
        hasFocus.email = value;
        break;
      case 'password':
        hasFocus.password = value;
        break;
      default:
        break;
    }

    this.setState({hasFocus});
  }

  onFocus = (e) => {
    let fieldName = e.target.name;
    
    this.toggleFocus(fieldName, true);
  }

  onBlur = (e) => {
    let fieldName = e.target.name;
    
    this.toggleFocus(fieldName, false);
  }

  render() {
    return (
      <main className={styles.main}>
        <h2>Log into <br/>Stock Watch</h2>
        <form style={{position: 'relative'}} onSubmit={this.onSubmit}>
          <div className={styles.input_block + ' ' + 
            styles.full + ' ' + (this.state.hasFocus.email ? styles.has_focus : '')}>
            <label>Email</label>
            <div className={styles.input_bar}></div>
            <input name='email' 
              placeholder='example@email.com'
              type='email'
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={this.state.email} />
          </div>
          <div className={styles.input_block + ' ' + 
            styles.full + ' ' + (this.state.hasFocus.password ? styles.has_focus : '')}
            style={{marginBottom: '30px'}}>
            <label>Password</label>
            <div className={styles.input_bar}></div>
            <input name='password' 
              placeholder='Something secure'
              type='password'
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur} />
          </div>
          
          <button className={styles.submit_button} 
            disabled={!this.state.formValid}>Login</button>
        </form>
        <div className={styles.redirect}>
          Don't have an account? Sign up <Link to='/signup'>here</Link>.
        </div>
      </main>
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