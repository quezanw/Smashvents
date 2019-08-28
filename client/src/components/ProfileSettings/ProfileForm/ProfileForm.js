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

  required = value => value ? undefined : 'Required';

  render() {
    return (
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={this.props.submitProfileEdit}>
          <Field
            name="username"
            label="Username"
            type="text"
            component={this.renderInput}
            validate={[this.required]}
          />
          <button className={styles.saveBtn} type="submit">Save</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ form: 'profileForm' })(ProfileForm);