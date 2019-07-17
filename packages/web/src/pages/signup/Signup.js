import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signupUser } from '@/store/actions';

import styles from './style.scss';

class SignupPage extends Component {

  state = {
    firstName: '',
    firstNameValid: false,
    lastName: '',
    lastNameValid: false,
    email: '',
    emailValid: false,
    password: '',
    passwordValid: false,
    passwordConfirm: '',
    passwordConfirmValid: false,
    hasFocus: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      passwordConfirm: false
    },
    formErrors: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    formValid: false
  }

  componentDidMount() {
    document.title = 'Stock Watch | Sign Up';
  }

  onSubmit = (e) => {
    e.preventDefault();

    let email = this.state.email;
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let password = this.state.password;

    let user = {
      email,
      firstName,
      lastName,
      password
    };

    if (this.state.formValid) {
      this.props.dispatchSignupUser(user);
    }
  }

  validateForm = () => {
    this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid
      && this.state.emailValid && this.state.passwordValid && this.state.passwordConfirmValid});
  }

  validateField = (fieldName, value) => {
    let fieldValdiationErrors = this.state.formErrors;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let passwordConfirmValid = this.state.passwordConfirmValid;

    switch (fieldName) {
      case 'firstName':
        firstNameValid = value.length > 0;
        fieldValdiationErrors.firstName = firstNameValid ? '' : ' is invalid';
        break;
      case 'lastName':
        lastNameValid = value.length > 0;
        fieldValdiationErrors.lastName = lastNameValid ? '' : ' is invalid';
        break;
      case 'email':
        emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(value);
        fieldValdiationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValdiationErrors.password = passwordValid ? '' : ' is too short';
        break;
      case 'passwordConfirm':
        passwordConfirmValid = this.state.password == value && this.state.passwordValid;
        fieldValdiationErrors.password = passwordConfirmValid ? '' : ' passwords do not match';
        break;
      default:
        break;
    }

    this.setState({formErrors: fieldValdiationErrors,
      firstNameValid,
      lastNameValid,
      emailValid,
      passwordValid,
      passwordConfirmValid}, this.validateForm)
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
      case 'firstName':
        hasFocus.firstName = value;
        break;
      case 'lastName':
        hasFocus.lastName = value;
        break;
      case 'email':
        hasFocus.email = value;
        break;
      case 'password':
        hasFocus.password = value;
        break;
      case 'passwordConfirm':
        hasFocus.passwordConfirm = value;
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
      <div className={styles.main}>
        <h2>Sign up for <br />Stock Watch</h2>
        <form style={{position: 'relative'}} onSubmit={this.onSubmit}>
          <div className={styles.input_container}>
            <div className={styles.input_block 
              + ' ' + styles.half + ' ' + styles.divider
              + ' ' + (this.state.hasFocus.firstName ? styles.has_focus : '')}>
              <label>Full Name</label>
              <div className={styles.input_bar}></div>
              <input name='firstName' 
                placeholder='First Name'
                type='text'
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                value={this.firstName} />
            </div>
            <div className={styles.input_block
              + ' ' + styles.half
              + ' ' + (this.state.hasFocus.lastName ? styles.has_focus : '')}>
              <div className={styles.input_bar}></div>
              <input name='lastName' 
                placeholder='Last Name'
                type='text'
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                value={this.lastName} />
            </div>
          </div>
          <div className={styles.input_block
           + ' ' + styles.full
           + ' ' + (this.state.hasFocus.email ? styles.has_focus : '')}>
            <label>Email</label>
            <div className={styles.input_bar}></div>
            <input name='email' 
              placeholder='example@email.com'
              type='email'
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              value={this.email} />
          </div>
          <div className={styles.input_container}>
            <div className={styles.input_block
              + ' ' + styles.half
              + ' ' + (this.state.hasFocus.password ? styles.has_focus : '')}>
              <label>Password</label>
              <div className={styles.input_bar}></div>
              <input name='password' 
                placeholder='Password'
                type='password'
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                value={this.state.password} />
            </div>
            <div className={styles.input_block
              + ' ' + styles.half
              + ' ' + (this.state.hasFocus.passwordConfirm ? styles.has_focus : '')}>
              <div className={styles.input_bar}></div>
              <input name='passwordConfirm' 
                placeholder='Confirm password'
                type='password'
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                value={this.state.passwordConfirm} />
            </div>
          </div>
          <button className={styles.submit_button}
            disabled={!this.state.formValid}>Submit</button>
        </form>
        <div className={styles.redirect}>
          Already have an account? Log in <Link to='/login'>here</Link>.
        </div>
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