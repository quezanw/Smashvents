import React from 'react'
import { reduxForm, Field } from 'redux-form';
import styles from './RegisterForm.module.scss';
import { required, email } from '../validations';

class RegisterForm extends React.Component {

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

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
      <form className={styles.registerForm} onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field 
          component={this.renderInput} 
          type="text" 
          label="Username" 
          name="username"
          validate={[required]}
        />
        <Field 
          component={this.renderInput} 
          type="text" 
          label="First Name" 
          name="first_name"
          validate={[required]}
        />
        <Field 
          component={this.renderInput} 
          type="text" 
          label="Last Name" 
          name="last_name"
          validate={[required]}
        />
        <Field 
          component={this.renderInput} 
          type="text" 
          label="Email" 
          name="email"
          validate={[required, email]}
        />
        <Field 
          component={this.renderInput} 
          type="password" 
          label="Password" 
          name="password"
          validate={[required]}
        />
        <button disabled={this.props.submitStatus} className={styles.submit} type="submit">
          Register
        </button>
      </form>
    )
  }
}


export default reduxForm({ form: 'registerForm' })(RegisterForm);