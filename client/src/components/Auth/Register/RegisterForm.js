import React from 'react'
import { reduxForm, Field } from 'redux-form';
import styles from './RegisterForm.module.scss';

class RegisterForm extends React.Component {
  render() {
    return (
      <form className={styles.registerForm}>
          REGISTER FORM
      </form>
    )
  }
}


export default reduxForm({ form: 'registerForm' })(RegisterForm);