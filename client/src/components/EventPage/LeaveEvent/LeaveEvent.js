import React from 'react';
import { connect } from 'react-redux';
// import { leaveEvent } from '../../../actions/index';
import styles from './LeaveEvent.module.scss';

class LeaveEvent extends React.Component {
  
  leaveEvent = () => this.props.leaveEvent(this.props.event.event_id);

  render() {
    let event = this.props.event;
    return (
        <div className={styles.wrapper}>
          <div className={styles.header}>Laeve Event</div>
          <div className={styles.content}>
            <h1 className={styles.message}>
              Are you sure you want to leave {event.title}?
            </h1>
            <div className={styles.btnContainer}>
              <button onClick={this.leaveEvent}>Confirm</button>
            </div>
          </div>
        </div>
    );
  }
}

export default connect(null)(LeaveEvent);

