import React from 'react'
import { reduxForm, Field } from 'redux-form';
import styles from './RegisterForm.module.scss';

class RegisterForm extends React.Component {

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
      <form className={styles.registerForm} onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field component={this.renderInput} type="text" label="Username" name="username"/>
        <Field component={this.renderInput} type="text" label="First Name" name="first_name"/>
        <Field component={this.renderInput} type="text" label="Last Name" name="last_name"/>
        <Field component={this.renderInput} type="text" label="Email" name="email"/>
        <Field component={this.renderInput} type="password" label="Password" name="password"/>
        <button type="submit">submit</button>
      </form>
    )
  }
}


export default reduxForm({ form: 'registerForm' })(RegisterForm);