import React from 'react'
import { reduxForm, Field } from 'redux-form';
import styles from './LoginForm.module.scss';
import { required, email } from '../validations';

class LoginForm extends React.Component {

  onSubmit = formValues =>  this.props.onSubmit(formValues);

  renderInput = ({ input, label, type, meta: {active, touched, error, warning} }) => {
    let inputClass = `${styles.input} ${active ? styles.active : styles.inactive}`
    return (
      <div className={styles.row}>
        <label>{label}</label>
        <input className={inputClass} {...input} type={type}/>
        {touched && (
          (error && <span className={styles.error}>{error}</span>) 
          || (warning && <span>{warning}</span>)
        )}
      </div>
    );
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className={styles.loginForm}>
        <Field 
          component={this.renderInput} 
          validate={[email, required]} 
          type="text" 
          label="Email" 
          name="email"
        />
        <Field 
          component={this.renderInput} 
          validate={[required]} 
          type="password" 
          label="Password" 
          name="password"
        />
        <button className={styles.submit} type="submit">Login</button>
      </form>
    )
  }
}

export default reduxForm({ form: 'loginForm' })(LoginForm);