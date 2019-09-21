import React from 'react';
import styles from './ProfileImageForm.module.scss';
import DropzoneInput from '../DropzoneInput/DropzoneInput';

class ProfileImageForm extends React.Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Profile Image</h1>
        <form className={styles.form} >
          <h3>Must be a least 160x160. Max file size: 10MB.</h3>
          <div className={styles.upload}>
            <DropzoneInput />
          </div>
        </form>
      </div>
    );
  }
}

export default ProfileImageForm;
