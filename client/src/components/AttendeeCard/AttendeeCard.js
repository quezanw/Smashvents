import React from 'react';
import styles from './AttendeeCard.module.scss';

const AttendeeCard = props =>  {
  let user = props.user;
  
  const renderIcon = () => {
    let { theme_color, profile_img, username } = user;
    if(profile_img.length > 0) {
      return ( 
        <div 
          style={{ backgroundImage: `url(${profile_img})`, backgroundColor: theme_color}} 
          className={styles.playerIcon}>
        </div>
      )
    }
    return <div style={{ backgroundColor: theme_color }} className={styles.playerIcon}>{username.charAt(0)}</div>
  }

  return ( 
    <div className={styles.wrapper}>
      {renderIcon()}
      <div className={styles.playerDetails}>
        <p className={styles.username}>
        {user.username}
        </p>
        <p className={styles.fullname}>
          {user.first_name} {user.last_name}
        </p>
      </div>
    </div>
  );
}

export default AttendeeCard;