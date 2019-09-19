import React from 'react';
import styles from './ProfileImageForm.module.scss';
import { reduxForm, Field } from 'redux-form';

// create action to submit profileImageForm
// pass actions through props from profile settings component

class ProfileImageForm extends React.Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Profile Image</h1>
        {/* onSubmit={this.props.handleSubmit(this.onSubmit)} */}
        <form className={styles.form} >
          <h3>Must be a least 160x160. Max file size: 10MB.</h3>
          <div className={styles.upload}>
          </div>
          {/* <button className={styles.saveBtn} type="submit">Save</button> */}
        </form>
      </div>
    );
  }
}

export default reduxForm({form: 'profileImageForm'})(ProfileImageForm);
