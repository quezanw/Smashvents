import React from 'react'
import AttendeeCard from '../../AttendeeCard/AttendeeCard';
import { Link } from 'react-router-dom';
import styles from './EventAttendees.module.scss';

const EventAttendees = props => {
  const attendees = props.attendees.slice(0,9).map(user => <AttendeeCard key={user.username} user={user}/>)
  return (
    <div className={styles.largeOuterContainer}>
      <h1>Attendees</h1>
      <div className={styles.attendees}>
        <div className={styles.innerContainer}>
          {attendees} 
        </div>
        <div className={styles.footer}>
          <Link className={styles.link} to={`/event/${props.title}/attendees`}>
            View All {props.total} Attendees
          </Link>
        </div>
        
      </div>
      
    </div>
  );
}

export default EventAttendees;