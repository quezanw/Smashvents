import React from 'react';
import { connect } from 'react-redux';
import { login, register } from '../../actions/index';
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
      return <LoginForm onSubmit={this.onLogin}/>
    }
    return <RegisterForm onSubmit={this.onRegister}/>
  }

  viewLoginForm = () => {
    this.setState({ selectedTab: 'login' })
  }

  viewRegisterForm = () => {
    this.setState({ selectedTab: 'register' })
  }


  render() {
    return (
      <div className={styles.wrapper}>
        <ul className={styles.tabPanel}>
          <li><button onClick={this.viewLoginForm}>Login</button></li>
          <li><button onClick={this.viewRegisterForm}>Register</button></li>
        </ul>
        {this.renderForm()}
      </div>
    );
  }

}

export default connect(null, { login, register })(Auth);