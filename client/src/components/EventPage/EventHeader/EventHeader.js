import React from 'react';
import moment from 'moment';
import styles from './EventHeader.module.scss';

const EventHeader = props => {
  let event = props.event;
  let start = moment(event.start_time, 'hh:mm:ss').format('h:mm A');
  let end = moment(event.end_time, 'hh:mm:ss').format('h:mm A');
  return (
    <div className={styles.header}>
      <h1>{event.title}</h1>
      <div className={styles.details}>
        <div className={styles.row}>
          <div className={styles.col}>
            <i className={`${styles.detailIcon} fas fa-clock`}></i>
            <p>{start} - {end}</p>
          </div>
          <div className={styles.col}>
            <i className={`${styles.detailIcon} fas fa-user`}></i>
            <p>{event.totalAttendees} Attendees</p>
          </div>
        </div>
        <div className={`${styles.row} ${styles.bottomRow}`}>
          <div className={styles.col}>
            <i className={`${styles.detailIcon} fas fa-calendar-alt`}></i>
            <p>{moment(event.start_date).format('MMM Do YYYY')}</p>
          </div>
          <div className={styles.col}>
            <i className={`${styles.detailIcon} fas fa-user-tag`}></i>
            <p>{event.host ? event.host.username : '...loading'}</p>
          </div>
          <div className={`${styles.col} ${styles.location}`}>
            <i className={`${styles.detailIcon} fas fa-map-marker-alt`}></i>
            <p>{event.online ? 'Online' : event.venue}</p>
          </div>
        </div>
      </div>
    </div>   
  );
}

export default EventHeader;