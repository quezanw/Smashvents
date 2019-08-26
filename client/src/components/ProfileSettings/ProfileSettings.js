import React from 'react';
import styles from './ProfileSettings.module.scss';
import ProfileForm from './ProfileForm/ProfileForm';
import { connect } from 'react-redux';

class ProfileSettings extends React.Component {
  render() {
    return ( 
      <div className={styles.wrapper}>
        <div className={styles.header}>
          Profile Settings
        </div>
        <ProfileForm/>
      </div>
    )
  }
}

export default connect(null)(ProfileSettings);