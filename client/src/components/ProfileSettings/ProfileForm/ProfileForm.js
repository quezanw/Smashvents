import React from 'react';
import { reduxForm, Field } from 'redux-form';
import styles from './ProfileForm.module.scss';

class ProfileForm extends React.Component {

  renderInput = ({ input, label, type, meta: {active, touched, error, warning} }) => {
    return (
      <div className={styles.row}>
        <label>{label}</label>
        <input {...input} type={type} autoComplete="off" />
        {touched && (
          (error && <span className={styles.error}>{error}</span>) 
          || (warning && <span>{warning}</span>)
        )}
      </div>
    );
  };

  render() {
    return (
      <div className={styles.formWrapper}>
        <form className={styles.form} >
          <Field
            name="username"
            label="Username"
            type="text"
            component={this.renderInput}
          />
          <button>Save</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'profileForm' })(ProfileForm);