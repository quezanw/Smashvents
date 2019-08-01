import React from 'react'
import { reduxForm, Field } from 'redux-form';

import styles from './LoginForm.module.scss';

class LoginForm extends React.Component {
  render() {
    return (
      <form className={styles.loginForm}>
        LOGIN FORM
      </form>
    )
  }
}

export default reduxForm({ form: 'loginForm' })(LoginForm);