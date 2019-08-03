import React from 'react';
import { connect } from 'react-redux';
import { login, register, clearLoginReg } from '../../actions/index';
import LoginForm from './Login/LoginForm';
import RegisterForm from './Register/RegisterForm';
import styles from './Auth.module.scss';

class Auth extends React.Component {
  state = { selectedTab: 'login' };

  onLogin = formValues => {
    this.props.login(formValues);
  }

  onRegister = formValues => {
    this.props.register(formValues);
  }

  renderForm = () => {
    if(this.state.selectedTab === 'login') {
      return <LoginForm onSubmit={this.onLogin}/>;
    }
    return <RegisterForm onSubmit={this.onRegister}/>
  }

  viewLoginForm = () => {
    this.props.clearLoginReg();
    this.setState({ selectedTab: 'login' })
  }

  viewRegisterForm = () => {
    this.props.clearLoginReg();
    this.setState({ selectedTab: 'register' })
  }

  renderError() {
    // console.log(this.props.auth, 'render error');
    let auth = this.props.auth;
    if(auth.loginError) {
      return <div className={styles.error}>{auth.loginError}</div>
    }
    if(auth.registrationError) {
      return <div className={styles.error}>{auth.registrationError}</div>
    }
  }

  render() {
    // console.log(this.props.auth)
    return (
      <div className={styles.wrapper}>
        <ul className={styles.tabPanel}>
          <li><button onClick={this.viewLoginForm}>Login</button></li>
          <li><button onClick={this.viewRegisterForm}>Register</button></li>
        </ul>
        <div className={styles.form}>
          {this.renderError()}
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { login, register, clearLoginReg })(Auth);