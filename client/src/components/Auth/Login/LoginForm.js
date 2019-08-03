import React from 'react'
import { reduxForm, Field } from 'redux-form';

import styles from './LoginForm.module.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super();
  }
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

  renderInput = ({input, label, meta, type}) => {
    return (
      <div>
        <label>{label}</label>
        <input {...input} type={type}/>
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={styles.loginForm}>
        <Field component={this.renderInput} type="text" label="Email" name="email"/>
        <Field component={this.renderInput} type="password" label="Password" name="password"/>
        <button type="submit">submit</button>
      </form>
    )
  }
}

export default reduxForm({ form: 'loginForm' })(LoginForm);