import React from 'react';
import styles from './AttendeeCard.module.scss';

const AttendeeCard = props =>  {
  let user = props.user;
  
  return ( 
    <div className={styles.wrapper}>
      <div style={{backgroundColor: user.theme_color}} className={styles.playerIcon}>
        <p>{user.username.charAt(0)}</p>
      </div>
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