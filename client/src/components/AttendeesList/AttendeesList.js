import React from 'react';
import styles from './AttendeesList.module.scss';
import { connect } from 'react-redux';
import AttendeeCard from '../AttendeeCard/AttendeeCard';


class AttendeesList extends React.Component {
  
  renderAttendees = user => {
    return (
      <div className={styles.row}>
        <AttendeeCard user={user} />
      </div>
    );
  }

  render() {
    const list = this.props.attendees.slice(0,19).map(this.renderAttendees)
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          Attendees
        </div>
        <div className={styles.searchWrapper}>
          <input 
            className={styles.search} 
            placeholder='search player' 
            type="text"
          />
        </div>
        <div className={styles.listWrapper}>
          <div className={styles.subHeader}>
            <h1>Attendees</h1>
            <button>v</button>
          </div>
          <div>
            {list}
          </div>
          <div className={styles.footer}>
            <div className={styles.pageControls}></div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    attendees: state.selectedEvent.attendees
  }
}
export default connect(mapStateToProps, {})(AttendeesList);