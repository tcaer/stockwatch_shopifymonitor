import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signupUser } from '@/store/actions';

import styles from './style.scss';

class SignupPage extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    hasFocus: {
      firstName: false,
      lastName: false,
      email: false
    }
  }

  componentDidMount() {
    document.title = 'Stock Watch | Sign Up';
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
          <input name='password' 
            placeholder='password'
            type='password'
            onChange={this.onChange} />
          <button className={styles.submit_button}>Submit</button>
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