import React from 'react'
import AttendeeCard from '../AttendeeCard/AttendeeCard';
import styles from './EventAttendees.module.scss';

const EventAttendees = props => {
  const attendees = props.attendees.map(user => <AttendeeCard key={user.username} user={user}/>)
  return (
    <div className={styles.largeOuterContainer}>
      <h1>Attendees</h1>
      <div className={styles.attendees}>
        {attendees}
      </div>
    </div>
  );
}

export default EventAttendees;