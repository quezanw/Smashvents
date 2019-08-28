import React from 'react';
import styles from './ProfileSettings.module.scss';
import ProfileForm from './ProfileForm/ProfileForm';
import ThemeForm from './ThemeForm/ThemeForm';
import Auth from '../Auth/Auth';
import { connect } from 'react-redux';

class ProfileSettings extends React.Component {
  render() {
    if(this.props.auth.isSignedIn) {
      let {username, first_name, last_name, theme_color} = this.props.auth;
      return ( 
        <div className={styles.wrapper}>
          <div className={styles.header}>
            Profile Settings
          </div>
          <div className={styles.row}>
            <div className={styles.userCard}>
              <div className={styles.userIcon} style={{backgroundColor: theme_color}}>
                {username.charAt(0).toUpperCase()}
              </div>
              <div className={styles.nameWrapper}>
                <h2 className={styles.username}>{username}</h2>
                <p className={styles.fullname}>{first_name} {last_name}</p>
              </div>
            </div>
            <ProfileForm/>
          </div>
          <ThemeForm theme_color={theme_color}/>
        </div>
      );
    }
    return (
      <div className={styles.authWrapper}>
        <h1>Login Required.</h1>
        <p>You must be logged in to view this page.</p>
        <div className={styles.auth}>
          <Auth />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(ProfileSettings);