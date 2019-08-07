import React from 'react'
import { reduxForm, Field } from 'redux-form';
import styles from './LoginForm.module.scss';

class LoginForm extends React.Component {

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

  renderInput = ({input, label, meta, type}) => {
    return (
      <div className={styles.row}>
        <label>{label}</label>
        <input className={styles.input} {...input} type={type}/>
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={styles.loginForm}>
        <Field component={this.renderInput} type="text" label="Email" name="email"/>
        <Field component={this.renderInput} type="password" label="Password" name="password"/>
        <button className={styles.submit} type="submit">Login</button>
      </form>
    )
  }
}

export default reduxForm({ form: 'loginForm' })(LoginForm);